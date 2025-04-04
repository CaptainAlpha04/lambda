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
import { Info, Beaker, FlaskRoundIcon as Flask, Atom, BookOpen, Zap, Droplets } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LabHelpProps {
  trigger?: React.ReactNode;
}

export const LabHelp: React.FC<LabHelpProps> = ({
  trigger = (
    <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
      <Info className="w-4 h-4" />
    </Button>
  ),
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 text-slate-300">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center gap-2">
            <Flask className="w-6 h-6 text-cyan-400" />
            Virtual Chemistry Lab Help
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="getting-started" className="mt-4">
          <TabsList className="grid grid-cols-3 bg-slate-800 mb-4">
            <TabsTrigger value="getting-started" className="data-[state=active]:bg-slate-700">
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-slate-700">
              Features
            </TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-slate-700">
              Safety Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Beaker className="w-5 h-5 text-cyan-400" />
                Welcome to the Virtual Chemistry Lab
              </h3>
              <p>
                This virtual lab allows you to experiment with chemical reactions in a safe, simulated environment.
                Here's how to get started:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <span className="font-medium text-white">Select chemicals</span>: Use the chemical selector at the top
                  to add substances to your workbench
                </li>
                <li>
                  <span className="font-medium text-white">Mix chemicals</span>: Click the "Mix Chemicals" button to see
                  the reaction result
                </li>
                <li>
                  <span className="font-medium text-white">View history</span>: Check your lab notebook to review past
                  experiments
                </li>
                <li>
                  <span className="font-medium text-white">Reset</span>: Clear your workbench to start fresh with new
                  chemicals
                </li>
              </ol>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="font-medium text-white mb-2">Quick Tips</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span> Hover over test tubes to see chemical details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span> Use the periodic table reference for element information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span> Export your experiments to save your findings
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Atom className="w-5 h-5 text-cyan-400" />
                Lab Features
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white">Chemical Selector</h4>
                  <p>
                    Search for and add a wide range of chemicals to your lab. Each chemical comes with detailed
                    information about its properties.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white">Reaction Simulation</h4>
                  <p>
                    Mix chemicals to observe reactions. The lab will simulate the results, including visual effects and
                    safety information.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" /> Lab Notebook
                  </h4>
                  <p>
                    Keep track of all your experiments. The notebook records the chemicals used, results, and timestamps
                    for each reaction.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white">Periodic Table</h4>
                  <p>
                    Reference the interactive periodic table to learn about different elements and their properties.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white">Export Functionality</h4>
                  <p>
                    Save your experiments as JSON files for future reference or to share with others.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                Safety Information
              </h3>
              <p>
                While this is a virtual environment, it's important to understand real-world laboratory safety. The
                following guidelines apply to actual chemical experiments:
              </p>

              <div className="p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg space-y-3 mt-4">
                <div>
                  <h4 className="font-medium text-amber-400">Personal Protective Equipment (PPE)</h4>
                  <p className="text-amber-200/70">
                    Always wear appropriate PPE in a real lab: safety goggles, lab coat, gloves, and closed-toe shoes.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-amber-400">Chemical Handling</h4>
                  <p className="text-amber-200/70">
                    Read safety data sheets (SDS) before working with any chemical. Never smell, taste, or touch
                    chemicals directly.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-amber-400">Emergency Procedures</h4>
                  <p className="text-amber-200/70">
                    Know the location of safety equipment: eyewash stations, safety showers, fire extinguishers, and
                    emergency exits.
                  </p>
                </div>
              </div>

              <p className="text-sm italic mt-4">
                This virtual lab is designed for educational purposes. Chemical reactions displayed may vary from
                real-world results. Always consult with a qualified instructor before attempting real laboratory
                experiments.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="default" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};