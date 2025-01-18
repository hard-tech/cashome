export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white text-black shadow rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-2">Solde actuel</h4>
            <p className="text-3xl font-bold">1000 €</p>
          </div>
          <div className="bg-white text-black shadow rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-2">Missions en cours</h4>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-white text-black shadow rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-2">Articles en vente</h4>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Dernières transactions</h3>
          {/* Liste des transactions ici */}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Missions en cours</h3>
          {/* Liste des missions ici */}
        </div>
      </div>
    </div>
  );
}