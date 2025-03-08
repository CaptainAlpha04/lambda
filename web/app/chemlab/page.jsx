import ChemicalLab from '../components/ChemicalLab'

export default function ChemLabPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            Virtual Chemistry Lab
          </h1>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Explore chemical reactions in a safe, virtual environment. Mix compounds, observe reactions, and discover the fascinating world of chemistry.
          </p>
        </header>
        
        <ChemicalLab />
        
        <footer className="mt-20 text-center text-cyan-200/60 text-sm">
          <p>All reactions are simulated. Always follow proper safety protocols in real laboratory settings.</p>
        </footer>
      </div>
    </main>
  );
}
