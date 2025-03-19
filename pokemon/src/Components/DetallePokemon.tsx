import React from 'react';

const PokemonCard: React.FC = () => {
  return (
    <div className="bg-blue-300 flex items-center justify-center p-4"> {/* Cambiado para centrar */}
      <div className="card-container animate-float">
        <div className="card w-64 sm:w-72 rounded-xl overflow-hidden"> {/* Reducido el tamaño */}
          <div className="glow-effect"></div>
          <div className="rainbow-border"></div>
          <div className="relative bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 p-3 rounded-xl">
            {/* Shine Lines */}
            <div className="shine-lines"></div>
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-bold text-white">Charizard</h2>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold">HP</span>
                <span className="text-white font-bold">120</span>
              </div>
            </div>

            {/* Card Image */}
            <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-rose-200"></div>
              <div className="absolute inset-0 holo-effect animate-holo-glow"></div>
              <div className="absolute inset-0 card-shine"></div>
              <div className="absolute inset-0 sparkles"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 energy-symbol rounded-full animate-energy-spin opacity-20"></div> {/* Reducido el tamaño */}
              </div>
              {/* Charizard Image */}
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                alt="Charizard"
                className="pokemon-image"
              />
            </div>

            {/* Pokemon Info */}
            <div className="bg-white/90 backdrop-blur rounded-lg p-3 space-y-3">
              {/* Type */}
              <div className="flex items-center gap-2">
                <span className="type-fire text-white text-xs px-2 py-1 rounded-full">Fire</span>
                <span className="text-xs text-neutral-600">Stage 2</span>
              </div>

              {/* Attacks */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-pulse-glow"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-pulse-glow"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Fire Spin</h3>
                    <p className="text-xs text-neutral-600">
                      Discard 2 Energy cards attached to Charizard in order to use this attack.
                    </p>
                  </div>
                  <span className="font-bold ml-auto">100</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200">
                <div>
                  <span className="text-neutral-600">Weakness</span>
                  <span className="ml-1 type-fire text-white px-2 py-0.5 rounded-full">Water</span>
                </div>
                <div>
                  <span className="text-neutral-600">Resistance</span>
                  <span className="ml-1 bg-neutral-200 px-2 py-0.5 rounded-full">-30</span>
                </div>
                <div>
                  <span className="text-neutral-600">Retreat Cost</span>
                  <span className="ml-1 bg-neutral-800 text-white px-2 py-0.5 rounded-full">3</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-3 text-[10px] text-white/80 text-center italic">
              Hecho por Cristian
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;