import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, useWindowDimensions, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../../components/SearchBox";
import WeatherCard from "../../components/WeatherCard";
import { useDebounce } from "../../hooks/use-debounce";
import { cariKota } from "../../services/geocodingService";
import type { HasilGeocoding } from "../../types/geocoding";

export default function HalamanUtama() {
	const [teksCari, setTeksCari] = useState("");
	const [hasil, setHasil] = useState<HasilGeocoding[]>([]);
	const [sedangMemuat, setSedangMemuat] = useState(false);
	const [pesanError, setPesanError] = useState<string | null>(null);
	const [nomorPercobaan, setNomorPercobaan] = useState(0);
	const teksTertunda = useDebounce(teksCari, 800);
	const { width } = useWindowDimensions();
	const padding = width > 768 ? 32 : 16;

	useEffect(() => {
		const namaKota = teksTertunda.trim();

		if (namaKota.length === 0) {
			setHasil([]);
			setPesanError(null);
			setSedangMemuat(false);
			return;
		}

		let masihAktif = true;
		setSedangMemuat(true);
		setPesanError(null);

		async function ambilData() {
			try {
				const data = await cariKota(namaKota);
				if (masihAktif) setHasil(data);
			} catch {
				if (masihAktif) {
					setPesanError("Gagal mengambil data. Periksa koneksi internet Anda.");
					setHasil([]);
				}
			} finally {
				if (masihAktif) setSedangMemuat(false);
			}
		}

		void ambilData();
		return () => {
			masihAktif = false;
		};
	}, [teksTertunda, nomorPercobaan]);

	const pencarianSelesai = teksTertunda.trim().length > 0 && !sedangMemuat && !pesanError;
	const tampilkanStatusKosong = pencarianSelesai && hasil.length === 0;

	return (
		<SafeAreaView style={{ flex: 1, padding, gap: 16 }}>
			<SearchBox onCari={setTeksCari} />
			{sedangMemuat ? <ActivityIndicator accessibilityLabel="Memuat hasil pencarian kota" /> : null}
			{pesanError ? (
				<View style={{ gap: 8 }}>
					<Text accessibilityLabel="Pesan kesalahan pencarian kota" accessibilityRole="alert">
						{pesanError}
					</Text>
					<Button
						title="Coba Lagi"
						accessibilityLabel="Coba lagi mencari kota"
						onPress={() => setNomorPercobaan((percobaan) => percobaan + 1)}
					/>
				</View>
			) : null}
			{tampilkanStatusKosong ? (
				<Text accessibilityLabel="Tidak ada kota ditemukan">Kota tidak ditemukan</Text>
			) : null}
			{pencarianSelesai ? <Text>Ditemukan {hasil.length} kota</Text> : null}
			{hasil.map((kota) => (
				<Link
					key={kota.id}
					href={{ pathname: "/detail/[kota]", params: { kota: kota.name } }}>
					<WeatherCard kota={kota.name} suhu={29} tingkatAQI="BAIK" />
				</Link>
			))}
		</SafeAreaView>
	);
}