import { Button, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalTambahFavorit() {
  const { kota } = useLocalSearchParams<{ kota?: string }>();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text>{kota ? `Tambahkan ${kota} ke daftar favorit?` : "Tambahkan kota ke daftar favorit?"}</Text>
      <Button title="Simpan" accessibilityLabel="Simpan kota ke favorit" onPress={() => router.back()} />
    </SafeAreaView>
  );
}