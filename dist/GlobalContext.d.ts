import React from "react";
export declare const save: any;
export interface GlobalContextType {
    night: number;
    setNight: (night: number) => void;
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
    volume: number;
    setVolume: (volume: number) => void;
}
declare const GlobalContext: React.Context<GlobalContextType | null>;
declare const useGlobal: () => GlobalContextType;
export { useGlobal, GlobalContext };
//# sourceMappingURL=GlobalContext.d.ts.map