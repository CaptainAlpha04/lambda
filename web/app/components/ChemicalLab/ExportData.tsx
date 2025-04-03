import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Download,
    FileJson,
    Files,
    FileText,
    CheckCircle,
    Copy,
    ClipboardCopy,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reaction } from "./types";

interface ExportDataProps {
    reactions: Reaction[];
    trigger?: React.ReactNode;
}

export const ExportData: React.FC<ExportDataProps> = ({
    reactions,
    trigger = (
        <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export
        </Button>
    ),
}) => {
    const [copied, setCopied] = React.useState(false);
    const [exportStatus, setExportStatus] = React.useState<{
        json: boolean;
        csv: boolean;
        txt: boolean;
    }>({
        json: false,
        csv: false,
        txt: false,
    });

    // Convert reactions data to various formats
    const jsonData = JSON.stringify(reactions, null, 2);

    const csvData = React.useMemo(() => {
        if (reactions.length === 0) return "No data available";

        // CSV header
        let csv = "Timestamp,Chemicals,Result\n";

        // Add rows
        reactions.forEach((reaction) => {
            const timestamp = new Date(reaction.timestamp).toLocaleString();
            const chemicals = reaction.chemicals.map((c) => c.name || c.formula).join(" + ");
            const result = reaction.result.name || reaction.result.formula;
            csv += `"${timestamp}","${chemicals}","${result}"\n`;
        });

        return csv;
    }, [reactions]);

    const txtData = React.useMemo(() => {
        if (reactions.length === 0) return "No data available";

        let text = "CHEMISTRY LAB EXPERIMENT RESULTS\n";
        text += "==============================\n\n";

        reactions.forEach((reaction, index) => {
            text += `EXPERIMENT #${index + 1}\n`;
            text += `Date: ${new Date(reaction.timestamp).toLocaleString()}\n\n`;
            text += "CHEMICALS USED:\n";

            reaction.chemicals.forEach((chemical, chemIndex) => {
                text += `  ${chemIndex + 1}. ${chemical.name || "Unknown"} (${chemical.formula || "N/A"})\n`;
            });

            text += "\nRESULT:\n";
            text += `  ${reaction.result.name || "Unknown"} (${reaction.result.formula || "N/A"})\n`;

            if (reaction.result.safety_info) {
                text += `\nSAFETY INFORMATION:\n  ${reaction.result.safety_info}\n`;
            }

            text += "\n==============================\n\n";
        });

        return text;
    }, [reactions]);

    // Copy data to clipboard
    const copyToClipboard = (data: string) => {
        navigator.clipboard.writeText(data);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Download data as file
    const downloadFile = (data: string, fileName: string, mimeType: string) => {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Update export status
        if (fileName.endsWith(".json")) {
            setExportStatus((prev) => ({ ...prev, json: true }));
            setTimeout(() => setExportStatus((prev) => ({ ...prev, json: false })), 2000);
        } else if (fileName.endsWith(".csv")) {
            setExportStatus((prev) => ({ ...prev, csv: true }));
            setTimeout(() => setExportStatus((prev) => ({ ...prev, csv: false })), 2000);
        } else if (fileName.endsWith(".txt")) {
            setExportStatus((prev) => ({ ...prev, txt: true }));
            setTimeout(() => setExportStatus((prev) => ({ ...prev, txt: false })), 2000);
        }
    };

    const getFormattedDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 text-slate-300">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-white flex items-center gap-2">
                        <Download className="w-6 h-6 text-cyan-400" />
                        Export Reaction Data
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-2">
                    <p className="text-slate-400">
                        Export your chemistry lab data in various formats to save or share your experiments.
                    </p>
                </div>

                <Tabs defaultValue="json" className="mt-4">
                    <TabsList className="grid grid-cols-3 bg-slate-800 mb-4">
                        <TabsTrigger value="json" className="data-[state=active]:bg-slate-700">
                            <FileJson className="w-4 h-4 mr-2" />
                            JSON
                        </TabsTrigger>
                        <TabsTrigger value="csv" className="data-[state=active]:bg-slate-700">
                            <Files className="w-4 h-4 mr-2" />
                            CSV
                        </TabsTrigger>
                        <TabsTrigger value="txt" className="data-[state=active]:bg-slate-700">
                            <FileText className="w-4 h-4 mr-2" />
                            Text Report
                        </TabsTrigger>
                    </TabsList>

                    {reactions.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            No reaction data available. Perform some experiments first!
                        </div>
                    ) : (
                        <>
                            <TabsContent value="json" className="space-y-4">
                                <div className="bg-slate-800 p-4 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-sm font-medium text-slate-400">JSON Data</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-slate-400 hover:text-white"
                                            onClick={() => copyToClipboard(jsonData)}
                                        >
                                            {copied ? <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
                                            {copied ? "Copied!" : "Copy"}
                                        </Button>
                                    </div>
                                    <pre className="text-xs overflow-auto max-h-60 p-2 bg-slate-900 rounded-md text-slate-300 break-all whitespace-pre-wrap">
                                        {jsonData}
                                    </pre>

                                </div>
                                <Button
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                    onClick={() => downloadFile(jsonData, `lab-reactions-${getFormattedDate()}.json`, "application/json")}
                                >
                                    {exportStatus.json ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                                            Downloaded!
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download JSON File
                                        </>
                                    )}
                                </Button>
                            </TabsContent>

                            <TabsContent value="csv" className="space-y-4">
                                <div className="bg-slate-800 p-4 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-sm font-medium text-slate-400">CSV Data</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-slate-400 hover:text-white"
                                            onClick={() => copyToClipboard(csvData)}
                                        >
                                            {copied ? <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
                                            {copied ? "Copied!" : "Copy"}
                                        </Button>
                                    </div>
                                    <pre className="text-xs overflow-auto max-h-60 p-2 bg-slate-900 rounded-md text-slate-300">
                                        {csvData}
                                    </pre>
                                </div>
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => downloadFile(csvData, `lab-reactions-${getFormattedDate()}.csv`, "text/csv")}
                                >
                                    {exportStatus.csv ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                                            Downloaded!
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download CSV File
                                        </>
                                    )}
                                </Button>
                            </TabsContent>

                            <TabsContent value="txt" className="space-y-4">
                                <div className="bg-slate-800 p-4 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-sm font-medium text-slate-400">Text Report</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-slate-400 hover:text-white"
                                            onClick={() => copyToClipboard(txtData)}
                                        >
                                            {copied ? <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
                                            {copied ? "Copied!" : "Copy"}
                                        </Button>
                                    </div>
                                    <pre className="text-xs overflow-auto max-h-60 p-2 bg-slate-900 rounded-md text-slate-300 whitespace-pre-wrap">
                                        {txtData}
                                    </pre>
                                </div>
                                <Button
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                                    onClick={() => downloadFile(txtData, `lab-reactions-${getFormattedDate()}.txt`, "text/plain")}
                                >
                                    {exportStatus.txt ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                                            Downloaded!
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Text Report
                                        </>
                                    )}
                                </Button>
                            </TabsContent>
                        </>
                    )}
                </Tabs>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => copyToClipboard(jsonData)}
                    >
                        <ClipboardCopy className="w-4 h-4 mr-2" />
                        Copy All Data
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};