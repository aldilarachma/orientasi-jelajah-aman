// components/SearchBox.tsx
import { useState } from "react";
import { TextInput, View } from "react-native";
interface SearchBoxProps {
onCari: (teks: string) => void;
}
export default function SearchBox({ onCari }: SearchBoxProps) {
const [teks, setTeks] = useState("");

function handleChange(nilaiBaru: string) {
setTeks(nilaiBaru);
onCari(nilaiBaru);
}

return (
<View>
<TextInput
placeholder="Cari nama kota..."
value={teks}
onChangeText={handleChange}
accessibilityLabel="Cari cuaca berdasarkan nama kota"
style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
/>
</View>
);
}