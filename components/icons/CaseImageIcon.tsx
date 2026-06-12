// components/icons/CaseImageIcon.tsx
import React from 'react';

// Mapa de iconos ASCII crudos, optimizados para ocupar un grid cuadrado minimalista.
const asciiIconsMap = {
    // Marketplace = robot
    marketplace: `                                                                                                                                                        
                      ====             
                      ====             
                       ==              
                 ==============        
               ==================      
              ====================     
              ===    ======    ===     
           +====      ====      ====+  
           +=====    ======    =====+  
             ======================    
              ====================     
    `,
    // Xplora = brujula
    xplora: `
         =%@@@@@@@@%=         
     .%@@*          *@@%.     
   .@@:                :@@.   
  #@*              %#    *@#  
 #@-            +@@@=     -@# 
=@*          -@@@@@@       *@=
@@         +@@##@@@=        @@
@%         @@    @@         %@
@@        =@@@##@@+         @@
=@*       @@@@@@-          *@=
 #@-     =@@@+            -@# 
  #@*    #%              *@#  
   .@@:                :@@.   
     .%@@*          *@@%.     
         =%@@@@@@@@%=         

`,
    // Aredes = Escudo con un tilde
    aredes: `
          -=%@@@@%=-          
  .:+@@@@@@@@@@@@@@@@@@@@+:.  
 .@@@@@@@@@@@@@@@@@@@@@@@@@@. 
 -@@@@@@@@@@@@@@@@@@@@@@@@@@- 
 -@@@@@@@@@@@@@@@@@@:.@@@@@@- 
 -@@@@@@@@@@@@@@@@:   .@@@@@- 
 -@@@@@@   -@@@@.   .@@@@@@@- 
 .@@@@@@@    .     @@@@@@@@@. 
  @@@@@@@@%      @@@@@@@@@@@  
  :@@@@@@@@@%  @@@@@@@@@@@@:  
   -@@@@@@@@@@@@@@@@@@@@@@-   
     @@@@@@@@@@@@@@@@@@@@     
      #@@@@@@@@@@@@@@@@#      
        .@@@@@@@@@@@@.        
           .+@@@@+.           

`,
    // Madre naturaleza = medicina (cruz simple)
    madrenaturaleza: `
       %@@@@@@@@@@@@@@%       
      #@@@@@@@@@@@@@@@@#      
        %@@@@@@@@@@@@%        
         @:        :@         
      +@#-          -#@+      
   .@:                  :@.   
   .@                    @.   
   .@   @@@@@@@@@@@@@@@@@@.   
   .@   @@@@@%  %@@@@@@@@@.   
   .@   @@@+      +@@@@@@@.   
   .@   @@@@@%  %@@@@@@@@@.   
   .@   %@@@@@@@@@@@@@@@@@.   
   .@                    @.   
   .@                    @.   
     =#@@@%#******#%@@@#=     

`,
    // Nebula = Hoja de arbol
    nebula: `
                     *@       
                 .*@@@@@      
             :@@@@@@@@@@@     
          #@@@@@@@@@@@@@@.    
       .%@@@@@@@@@@%@@@@@@    
      %@@@@@@@@@@@*@@@@@@@    
     @@@@@@@@@@@@=@@@@@@@@    
    .@@@@@@@@@@#%@@@@@@@@     
    @@@@@@@@@% @@@@@@@@@*     
    @@@@@@@# *@@@@@@@@@=      
     @@@@=.*@@@@@@@@@%        
     #@:.@@@@@@@@@@#          
       *@@@@@@@               
       @=                     
      %@                      

`,
    // Equitas = Balanza
    equitas: `                  
              ==              
              ==              
     :=*++++++##++++++*=:     
       -.     ==     .- .     
     .. +     ==     + ..     
    ..        ==        ..    
   -+.....    ==    .....+-   
   :#@@@@#   .**.   #@@@@#:   
             :##:             
             -%%-             
           %@@@@@@%          
`,
    // Nomos = Un nomo (gorro puntual)
    nomos: `
              ++              
             ++++             
            ++++++            
           ++++++++           
         ++++++++++++         
         =::::::::::=         
         ..:::..:::..         
         ............         
       ++++=-....-=++++       
      ++++++++==++++++++      
      ++++++++++++++++++      
      ::=++++++++++++=::      
          ##########          
         #####  #####         
         #####  #####         
`,
    // Consultorio p&p = Diente (simplificado)
    pyp: `                     
       **-::******::-**       
     **=.............:=#*     
     *=.............:::=*     
     *+:..........::::-+*     
      *=........::::::=*      
      **:.....:::::::-**      
      **-...:=**=::::=**      
      **-.:::*  *::::=#*      
       #=:::**  **:::=#       
       **=::**  **::=**       
        #*=+*#  #*+=#*        
`,
    // Pizza block = Una porcion de pizza
    pizzablock: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣶⣶⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣷⣤⠀⠈⠙⢿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⠆⠰⠶⠀⠘⢿⣿⣿⣿⣿⣿⣆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⠏⠀⢀⣠⣤⣤⣀⠙⣿⣿⣿⣿⣿⣷⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⠋⢈⣉⠉⣡⣤⢰⣿⣿⣿⣿⣿⣷⡈⢿⣿⣿⣿⣿⣷⡀
⠀⠀⠀⠀⠀⠀⠀⡴⢡⣾⣿⣿⣷⠋⠁⣿⣿⣿⣿⣿⣿⣿⠃⠀⡻⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⢀⠜⠁⠸⣿⣿⣿⠟⠀⠀⠘⠿⣿⣿⣿⡿⠋⠰⠖⠱⣽⠟⠋⠉⡇
⠀⠀⠀⠀⡰⠉⠖⣀⠀⠀⢁⣀⠀⣴⣶⣦⠀⢴⡆⠀⠀⢀⣀⣀⣉⡽⠷⠶⠋⠀
⠀⠀⠀⡰⢡⣾⣿⣿⣿⡄⠛⠋⠘⣿⣿⡿⠀⠀⣐⣲⣤⣯⠞⠉⠁⠀⠀⠀⠀⠀
⠀⢀⠔⠁⣿⣿⣿⣿⣿⡟⠀⠀⠀⢀⣄⣀⡞⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡜⠀⠀⠻⣿⣿⠿⣻⣥⣀⡀⢠⡟⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⠁⠀⡤⠖⠺⢶⡾⠃⠀⠈⠙⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠓⠾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
};

// Normalizamos las claves para asegurar match incluso si los IDs tienen símbolos o espacios.
type ProjectIdRaw =
    | 'marketplace agéntico'
    | 'xplora'
    | 'aredes'
    | 'madre naturaleza'
    | 'nebula'
    | 'equitas'
    | 'nomos'
    | 'consultorio p&p'
    | 'pizza block';

const normalizeId = (id: string): keyof typeof asciiIconsMap | null => {
    const normalized = id.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Buscamos si el nombre normalizado incluye la palabra clave base
    if (normalized.includes('marketplace')) return 'marketplace';
    if (normalized.includes('xplora')) return 'xplora';
    if (normalized.includes('aredes')) return 'aredes';
    if (normalized.includes('equitas')) return 'equitas';
    if (normalized.includes('consultoriopp')) return 'pyp';
    if (normalized.includes('madrenaturaleza')) return 'madrenaturaleza';
    if (normalized.includes('nebula')) return 'nebula';
    if (normalized.includes('nomos')) return 'nomos';
    if (normalized.includes('pizzablock')) return 'pizzablock';

    return null;
};

interface CaseImageIconProps {
    projectId: string; // El ID que usas en tu array de datos de casos.
}

const CaseImageIcon: React.FC<CaseImageIconProps> = ({ projectId }) => {
    const normalizedKey = normalizeId(projectId);
    const asciiArt = normalizedKey ? asciiIconsMap[normalizedKey] : null;

    if (!asciiArt) {
        // Fallback: si no encuentra el icono, muestra el "?" naranja original.
        return (
            <div className="flex h-full w-full items-center justify-center bg-black/50 rounded-lg border border-gray-800">
                <span className="text-6xl font-bold text-[#ff4000]">?</span>
            </div>
        );
    }

    // Renderizado del icono ASCII
    return (
        <div className="flex h-full w-full items-center justify-center bg-black rounded-lg border border-gray-800 p-2 overflow-hidden select-none">
            <pre
                className="font-mono text-[10px] sm:text-xs leading-tight text-[#ff4000] whitespace-pre-wrap"
                aria-hidden="true" // Es decorativo
            >
                {asciiArt}
            </pre>
        </div>
    );
};

export default CaseImageIcon;