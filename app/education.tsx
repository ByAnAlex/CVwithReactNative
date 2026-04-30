import { useRef, useState } from "react";
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
import TopTabs from "./topTabs";

const educationHistory = [
  {
    period: "Tahun 2012 - 2018",
    title: "SD",
    place: "SD Taman Harapan Malang, Indonesia",
  },
  {
    period: "Tahun 2028 - 2020",
    title: "SMP",
    place: "SMPK Kolese Santo Yusup 1, Malang, Indonesia",
  },
  {
    period: "Tahun 2020 - 2023",
    title: "SMA",
    place: "SMAK Santa Maria Malang, Indonesia",
  },
  {
    period: "Tahun 2023 - Sekarang",
    title: "Kuliah",
    place: "Bina Nusantara di Kota Malang, Indonesia",
  },
];

export default function EducationScreen() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
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
        <TopTabs />

        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>EDUCATION JOURNEY</Text>
          <Text style={styles.title}>Riwayat Pendidikan</Text>
        </View>

        <View style={styles.timelineCard}>
          {educationHistory.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <View
                key={`${item.period}-${item.title}`}
                style={[
                  styles.timelineItem,
                  index === educationHistory.length - 1 && styles.timelineItemLast,
                ]}
              >
                <View style={styles.timelineRail}>
                  <View style={[styles.timelineDot, isActive && styles.timelineDotActive]} />
                  {index !== educationHistory.length - 1 ? (
                    <View style={styles.timelineLine} />
                  ) : null}
                </View>

                <Pressable
                  onHoverIn={() => setActiveCard(index)}
                  onHoverOut={() => setActiveCard(null)}
                  onPressIn={() => setActiveCard(index)}
                  onPressOut={() => setActiveCard(null)}
                  style={({ pressed }) => [
                    styles.timelineContent,
                    (pressed || isActive) && styles.timelineContentActive,
                  ]}
                >
                  <Text style={styles.period}>{item.period}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPlace}>{item.place}</Text>
                </Pressable>
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
  timelineCard: {
    backgroundColor: "rgba(5, 13, 24, 0.8)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  timelineItem: {
    flexDirection: "row",
    gap: 16,
    paddingBottom: 18,
  },
  timelineItemLast: {
    paddingBottom: 0,
  },
  timelineRail: {
    width: 20,
    alignItems: "center",
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#7dd3fc",
    marginTop: 6,
    shadowColor: "#7dd3fc",
    shadowOpacity: 0.45,
    shadowRadius: 8,
  },
  timelineDotActive: {
    backgroundColor: "#dff7ff",
    shadowOpacity: 0.95,
    shadowRadius: 12,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "rgba(125, 211, 252, 0.26)",
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 7,
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.08)",
  },
  timelineContentActive: {
    backgroundColor: "rgba(125, 211, 252, 0.08)",
    borderColor: "rgba(125, 211, 252, 0.35)",
    shadowColor: "#7dd3fc",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
    transform: [{ scale: 1.01 }],
  },
  period: {
    color: "#7dd3fc",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  itemPlace: {
    color: "#d3e5f7",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
  },
});
