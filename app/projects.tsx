import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Linking,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import StarBackground from "./starBackground";

const projects = [
  {
    title: "BadApple",
    category: "C Language",
    image: require("../assets/images/portofolio/BadApple.png"),
    description:
      "Proyek untuk menampilkan video animasi Bad Apple beserta audionya langsung di terminal.",
    url: "https://github.com/ByAnAlex/Bad-Apple-in-Terminal-using-C",
  },
  {
    title: "Tierlog",
    category: "AI Web",
    image: require("../assets/images/portofolio/Tierlog.jpg"),
    description:
      "Proyek web berbasis AI untuk membantu mahasiswa dalam bimbingan skripsi dengan dosen melalui feedback major dan minor.",
    url: "https://github.com/cruzhgggggg-coder/Tier_Log",
  },
  {
    title: "Web Portofolio",
    category: "Laravel Web",
    image: require("../assets/images/portofolio/WebPortofolio.png"),
    description:
      "Web dinamis untuk portofolio pribadi yang lebih proper dengan memanfaatkan Laravel.",
    url: "https://github.com/ByAnAlex/WebPortofolio",
  },
  {
    title: "Insight Navigator",
    category: "AI Web",
    image: require("../assets/images/portofolio/AIPrediction.png"),
    description:
      "Proyek web untuk membantu siswa memahami pelajaran yang paling dikuasai, yang masih lemah, serta strategi belajar yang lebih tepat.",
    url: "https://github.com/cruzhgggggg-coder/insight-navigator",
  },
];

export default function ProjectsScreen() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;

  const columnCount = width >= 1100 ? 3 : width >= 700 ? 2 : 1;
  const cardBasis =
    columnCount === 3 ? "31.8%" : columnCount === 2 ? "48.5%" : "100%";

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
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backPressed,
          ]}
        >
          <Feather name="arrow-left" size={18} color="#d9f5ff" />
          <Text style={styles.backText}>Kembali ke Pendidikan</Text>
        </Pressable>

        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>PROJECT ARCHIVE</Text>
          <Text style={styles.title}>Riwayat Project</Text>
        </View>

        <View style={styles.metaPanel}>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>04</Text>
            <Text style={styles.metaLabel}>Project</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>UI</Text>
            <Text style={styles.metaLabel}>Visual Direction</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>WEB</Text>
            <Text style={styles.metaLabel}>Web Focus</Text>
          </View>
        </View>

        <View style={styles.projectGrid}>
          {projects.map((project, index) => {
            const isActive = activeCard === index;

            return (
              <View
                key={project.title}
                style={[styles.projectCard, { width: cardBasis }]}
              >
                <Pressable
                  onHoverIn={() => setActiveCard(index)}
                  onHoverOut={() => setActiveCard(null)}
                  onPressIn={() => setActiveCard(index)}
                  onPressOut={() => setActiveCard(null)}
                  style={({ pressed }) => [
                    styles.imageFrame,
                    (pressed || isActive) && styles.imageFrameActive,
                  ]}
                >
                  <Image
                    source={project.image}
                    style={styles.projectImage}
                    contentFit="contain"
                  />

                  <View
                    style={[
                      styles.imageOverlay,
                      (isActive || width < 700) && styles.imageOverlayVisible,
                    ]}
                  >
                    <Pressable
                      onPress={() => Linking.openURL(project.url)}
                      style={({ pressed }) => [
                        styles.overlayButton,
                        pressed && styles.overlayButtonPressed,
                      ]}
                    >
                      <Text style={styles.overlayButtonText}>
                        Lihat Project
                      </Text>
                      <Feather
                        name="arrow-up-right"
                        size={16}
                        color="#03101c"
                      />
                    </Pressable>
                  </View>
                </Pressable>

                <View style={styles.projectInfo}>
                  <Text style={styles.projectCategory}>{project.category}</Text>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
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
    paddingTop: 20,
    paddingBottom: 36,
    gap: 18,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  backPressed: {
    opacity: 0.88,
  },
  backText: {
    color: "#d9f5ff",
    fontSize: 13,
    fontWeight: "600",
  },
  headerCard: {
    backgroundColor: "rgba(7, 17, 31, 0.84)",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.18)",
    gap: 8,
  },
  eyebrow: {
    color: "#7dd3fc",
    fontSize: 12,
    letterSpacing: 2,
  },
  title: {
    color: "#f7fbff",
    fontSize: 28,
    fontWeight: "700",
  },
  metaPanel: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "rgba(5, 13, 24, 0.8)",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  metaItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  metaValue: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  metaLabel: {
    color: "#9db7cb",
    fontSize: 12,
    textAlign: "center",
  },
  metaDivider: {
    width: 1,
    backgroundColor: "rgba(125, 211, 252, 0.16)",
  },
  projectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 18,
  },
  projectCard: {
    backgroundColor: "rgba(7, 17, 31, 0.9)",
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.14)",
    gap: 16,
  },
  imageFrame: {
    position: "relative",
    height: 270,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageFrameActive: {
    borderColor: "rgba(125, 211, 252, 0.3)",
    shadowColor: "#7dd3fc",
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(4, 11, 22, 0.56)",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
  imageOverlayVisible: {
    opacity: 1,
  },
  overlayButton: {
    backgroundColor: "#7dd3fc",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  overlayButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  overlayButtonText: {
    color: "#03101c",
    fontSize: 14,
    fontWeight: "800",
  },
  projectInfo: {
    paddingHorizontal: 4,
    gap: 8,
  },
  projectCategory: {
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  projectTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "700",
  },
  projectDescription: {
    color: "#afc6d9",
    fontSize: 14,
    lineHeight: 22,
  },
});
