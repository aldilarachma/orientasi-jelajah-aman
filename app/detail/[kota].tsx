import { Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherCard from "../../components/WeatherCard";

export default function HalamanDetail() {
  const { kota } = useLocalSearchParams<{ kota: string }>();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 16 }}>
      <WeatherCard kota={kota} suhu={29} tingkatAQI="BAIK" />
      <Button
        title="Tambahkan ke Favorit"
        accessibilityLabel={`Tambahkan ${kota} ke favorit`}
        onPress={() => router.push({ pathname: "/tambah-favorit", params: { kota } })}
      />
    </SafeAreaView>
  );
}