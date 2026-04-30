import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StarBackground from "./starBackground";

const skillLevels = [
  { name: "Bahasa C", value: 60 },
  { name: "Java", value: 40 },
  { name: "Python", value: 40 },
  { name: "Edit Video", value: 70 },
];

const strengths = [
  "Mampu merancang antarmuka mobile yang rapi dan terstruktur.",
  "Terbiasa membangun alur aplikasi yang mudah dipahami pengguna.",
  "Fokus pada detail visual agar hasil terasa profesional.",
];

function getSkillColor(value: number) {
  if (value <= 20) return "#ef4444";
  if (value <= 50) return "#f97316";
  if (value <= 75) return "#facc15";
  return "#22c55e";
}

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#040b16" />
      <StarBackground scrollY={scrollY} />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroHeadingWrap}>
              <Text style={styles.eyebrow}>PERSONAL PORTFOLIO</Text>
              <Text style={styles.heroTitle}>Profil Singkat</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active Student</Text>
            </View>
          </View>

          <View style={styles.profileRow}>
            <Image
              source={require("../assets/images/Photo Profile.jpg")}
              style={styles.avatar}
              contentFit="cover"
            />

            <View style={styles.profileMainInfo}>
              <Text style={styles.name}>Bryan Alexander</Text>
              <Text style={styles.role}>Computer Science Student</Text>
              <Text style={styles.bio}>
                Mahasiswa BINUS University yang sedang membangun fondasi kuat di
                bidang computer science, pemrograman, dan pengembangan karya
                digital.
              </Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>University</Text>
              <Text style={styles.infoValue}>BINUS University</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Degree</Text>
              <Text style={styles.infoValue}>Computer Science</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>081280085180</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValueSmall}>bryanpek2006@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Skills</Text>
          <View style={styles.skillsCard}>
            {skillLevels.map((skill) => {
              const fillColor = getSkillColor(skill.value);

              return (
                <View key={skill.name} style={styles.skillRow}>
                  <View style={styles.skillHeader}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <Text style={[styles.skillPercent, { color: fillColor }]}>
                      {skill.value}%
                    </Text>
                  </View>
                  <View style={styles.skillTrack}>
                    <View
                      style={[
                        styles.skillFill,
                        {
                          width: `${skill.value}%`,
                          backgroundColor: fillColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kemampuan Utama</Text>
          <View style={styles.glassCard}>
            {strengths.map((strength, index) => (
              <View key={strength} style={styles.strengthRow}>
                <View style={styles.strengthIndex}>
                  <Text style={styles.strengthIndexText}>0{index + 1}</Text>
                </View>
                <Text style={styles.strengthText}>{strength}</Text>
              </View>
            ))}
          </View>
        </View>

        <Link href="/education" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Lihat Riwayat Pendidikan
            </Text>
            <Feather name="arrow-right" size={18} color="#03101c" />
          </Pressable>
        </Link>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#040b16",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
    gap: 20,
  },
  heroCard: {
    backgroundColor: "rgba(7, 17, 31, 0.84)",
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.2)",
    borderRadius: 28,
    padding: 22,
    gap: 22,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  heroHeadingWrap: {
    flex: 1,
  },
  eyebrow: {
    color: "#7dd3fc",
    fontSize: 12,
    letterSpacing: 2.2,
    marginBottom: 10,
  },
  heroTitle: {
    color: "#f8fbff",
    fontSize: 30,
    fontWeight: "700",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(12, 107, 118, 0.2)",
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34d399",
  },
  statusText: {
    color: "#d7f8ff",
    fontSize: 12,
    fontWeight: "600",
  },
  profileRow: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
  },
  avatar: {
    width: 126,
    height: 152,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(125, 211, 252, 0.45)",
  },
  profileMainInfo: {
    flex: 1,
    gap: 10,
  },
  name: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "700",
    lineHeight: 32,
  },
  role: {
    color: "#7dd3fc",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  bio: {
    color: "#bfd6ea",
    fontSize: 14,
    lineHeight: 22,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  infoCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.12)",
    gap: 6,
  },
  infoLabel: {
    color: "#7dd3fc",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  infoValue: {
    color: "#f8fbff",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  infoValueSmall: {
    color: "#f8fbff",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: "#edf6ff",
    fontSize: 20,
    fontWeight: "700",
  },
  skillsCard: {
    backgroundColor: "rgba(6, 14, 26, 0.82)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 16,
  },
  skillRow: {
    gap: 10,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillName: {
    color: "#eef8ff",
    fontSize: 15,
    fontWeight: "600",
  },
  skillPercent: {
    fontSize: 14,
    fontWeight: "700",
  },
  skillTrack: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  skillFill: {
    height: "100%",
    borderRadius: 999,
  },
  glassCard: {
    backgroundColor: "rgba(6, 14, 26, 0.8)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 14,
  },
  strengthRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  strengthIndex: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#0c6b76",
    justifyContent: "center",
    alignItems: "center",
  },
  strengthIndexText: {
    color: "#e9fdff",
    fontSize: 13,
    fontWeight: "700",
  },
  strengthText: {
    flex: 1,
    color: "#c8d7e5",
    fontSize: 14,
    lineHeight: 21,
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#7dd3fc",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#7dd3fc",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  primaryButtonPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.99 }],
    shadowOpacity: 0.22,
  },
  primaryButtonText: {
    color: "#03101c",
    fontSize: 15,
    fontWeight: "800",
  },
});
