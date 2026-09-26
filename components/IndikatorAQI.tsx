import { Text, View } from "react-native";
import type { LaporanUdara } from "../types/cuaca";

interface IndikatorAQIProps {
  laporan: LaporanUdara;
}

const warnaTingkat: Record<LaporanUdara["tingkat"], string> = {
  BAIK: "green",
  SEDANG: "orange",
  TIDAK_SEHAT: "red",
  BERBAHAYA: "darkred",
};

export default function IndikatorAQI({ laporan }: IndikatorAQIProps) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontWeight: "bold" }}>Kualitas udara {laporan.kota}</Text>
      <Text style={{ color: warnaTingkat[laporan.tingkat] }}>
        AQI {laporan.indeksAQI}: {laporan.tingkat}
      </Text>
      {laporan.diperbaruiPada ? (
        <Text>Diperbarui: {laporan.diperbaruiPada}</Text>
      ) : null}
    </View>
  );
}