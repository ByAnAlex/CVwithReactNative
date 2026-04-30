import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const tabs = [
  { href: "/", label: "Profil" },
  { href: "/education", label: "Pendidikan" },
  { href: "/projects", label: "Project" },
];

export default function TopTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link key={tab.href} href={tab.href} asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.tab,
                  isActive && styles.tabActive,
                  pressed && styles.tabPressed,
                ]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 22,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(5, 13, 24, 0.9)",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.18)",
  },
  tab: {
    width: "31%",
    minHeight: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  tabActive: {
    backgroundColor: "#7dd3fc",
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#7dd3fc",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  tabPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  tabText: {
    color: "#d6e9f8",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  tabTextActive: {
    color: "#03101c",
  },
});
