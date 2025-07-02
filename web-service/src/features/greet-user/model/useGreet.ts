import { useState } from "react";

export function useGreet() {
    const [name, setName] = useState<string>("");
    return { name, setName };
}