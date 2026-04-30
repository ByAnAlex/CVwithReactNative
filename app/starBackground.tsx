import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");
const AMBIENT_STAR_COUNT = 88;
const ACCENT_STAR_COUNT = 24;
const SHOOTING_STAR_COUNT = 10;

type AmbientStar = {
  x: number;
  y: number;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  duration: number;
  delay: number;
};

type ShootingStar = {
  startX: number;
  startY: number;
  travelX: number;
  travelY: number;
  length: number;
  delay: number;
  pause: number;
  duration: number;
  scale: number;
};

type StarBackgroundProps = {
  scrollY?: Animated.Value;
};

const createAmbientStars = (
  count: number,
  sizeRange: [number, number],
  opacityRange: [number, number],
  durationRange: [number, number]
): AmbientStar[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height * 1.4,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    minOpacity: opacityRange[0],
    maxOpacity:
      opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
    duration:
      durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]),
    delay: Math.random() * 2200,
  }));

const createShootingStars = (): ShootingStar[] =>
  Array.from({ length: SHOOTING_STAR_COUNT }, (_, index) => ({
    startX: width * (0.35 + Math.random() * 0.65),
    startY: -220 - index * 25 - Math.random() * 120,
    travelX: -(220 + Math.random() * 220),
    travelY: 320 + Math.random() * 260,
    length: 120 + Math.random() * 95,
    delay: index * 420 + Math.random() * 600,
    pause: 500 + Math.random() * 900,
    duration: 700 + Math.random() * 520,
    scale: 0.85 + Math.random() * 0.5,
  }));

export default function StarBackground({ scrollY }: StarBackgroundProps) {
  const ambientStars = useMemo(
    () =>
      createAmbientStars(AMBIENT_STAR_COUNT, [0.8, 2.4], [0.07, 0.62], [1600, 3900]),
    []
  );
  const accentStars = useMemo(
    () =>
      createAmbientStars(ACCENT_STAR_COUNT, [2.2, 4.3], [0.14, 0.95], [1000, 2300]),
    []
  );
  const shootingStars = useMemo(createShootingStars, []);

  const twinkles = useRef(
    ambientStars.map((star) => new Animated.Value(star.minOpacity))
  ).current;
  const accentTwinkles = useRef(
    accentStars.map((star) => new Animated.Value(star.minOpacity))
  ).current;
  const streakProgress = useRef(
    shootingStars.map(() => new Animated.Value(0))
  ).current;
  const nebulaPulse = useRef(new Animated.Value(0.55)).current;
  const drift = useRef(new Animated.Value(0)).current;

  const sharedScrollY = scrollY ?? new Animated.Value(0);

  const farLayerTranslate = sharedScrollY.interpolate({
    inputRange: [0, 700],
    outputRange: [0, -16],
    extrapolate: "clamp",
  });
  const midLayerTranslate = sharedScrollY.interpolate({
    inputRange: [0, 700],
    outputRange: [0, -32],
    extrapolate: "clamp",
  });
  const nearLayerTranslate = sharedScrollY.interpolate({
    inputRange: [0, 700],
    outputRange: [0, -58],
    extrapolate: "clamp",
  });
  const starsDriftX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-14, 14],
  });
  const starsDriftY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [8, -10],
  });
  const accentDriftX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -12],
  });

  useEffect(() => {
    const createTwinkleLoop = (
      value: Animated.Value,
      star: AmbientStar,
      dimOpacity: number
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(star.delay),
          Animated.timing(value, {
            toValue: star.maxOpacity,
            duration: star.duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: dimOpacity,
            duration: star.duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );

    const twinkleLoops = twinkles.map((value, index) =>
      createTwinkleLoop(value, ambientStars[index], ambientStars[index].minOpacity)
    );
    const accentLoops = accentTwinkles.map((value, index) =>
      createTwinkleLoop(value, accentStars[index], accentStars[index].minOpacity)
    );
    const shootingLoops = streakProgress.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(shootingStars[index].delay),
          Animated.timing(value, {
            toValue: 1,
            duration: shootingStars[index].duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.delay(shootingStars[index].pause),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );
    const nebulaLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(nebulaPulse, {
          toValue: 0.84,
          duration: 5400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(nebulaPulse, {
          toValue: 0.46,
          duration: 5400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    const driftLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 9000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 9000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    twinkleLoops.forEach((animation) => animation.start());
    accentLoops.forEach((animation) => animation.start());
    shootingLoops.forEach((animation) => animation.start());
    nebulaLoop.start();
    driftLoop.start();

    return () => {
      twinkleLoops.forEach((animation) => animation.stop());
      accentLoops.forEach((animation) => animation.stop());
      shootingLoops.forEach((animation) => animation.stop());
      nebulaLoop.stop();
      driftLoop.stop();
    };
  }, [
    accentStars,
    accentTwinkles,
    ambientStars,
    drift,
    nebulaPulse,
    shootingStars,
    streakProgress,
    twinkles,
  ]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.baseGlow} />

      <Animated.View
        style={[
          styles.nebulaLayer,
          {
            transform: [{ translateY: farLayerTranslate }],
          },
        ]}
      >
        <Animated.View style={[styles.topNebula, { opacity: nebulaPulse }]} />
        <Animated.View
          style={[
            styles.topNebulaEcho,
            {
              opacity: nebulaPulse.interpolate({
                inputRange: [0.46, 0.84],
                outputRange: [0.22, 0.46],
              }),
            },
          ]}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.nebulaLayer,
          {
            transform: [{ translateY: midLayerTranslate }, { translateX: starsDriftX }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.midNebula,
            {
              opacity: nebulaPulse.interpolate({
                inputRange: [0.46, 0.84],
                outputRange: [0.25, 0.56],
              }),
            },
          ]}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.nebulaLayer,
          {
            transform: [{ translateY: nearLayerTranslate }, { translateX: accentDriftX }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.bottomNebula,
            {
              opacity: nebulaPulse.interpolate({
                inputRange: [0.46, 0.84],
                outputRange: [0.34, 0.74],
              }),
            },
          ]}
        />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: farLayerTranslate }, { translateX: starsDriftX }],
        }}
      >
        {ambientStars.map((star, index) => (
          <Animated.View
            key={`ambient-${index}`}
            style={[
              styles.ambientStar,
              {
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
                opacity: twinkles[index],
              },
            ]}
          />
        ))}
      </Animated.View>

      <Animated.View
        style={{
          transform: [
            { translateY: midLayerTranslate },
            { translateX: accentDriftX },
            { translateY: starsDriftY },
          ],
        }}
      >
        {accentStars.map((star, index) => (
          <Animated.View
            key={`accent-${index}`}
            style={[
              styles.accentStar,
              {
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
                opacity: accentTwinkles[index],
              },
            ]}
          />
        ))}
      </Animated.View>

      {shootingStars.map((star, index) => {
        const translateX = streakProgress[index].interpolate({
          inputRange: [0, 1],
          outputRange: [star.startX, star.startX + star.travelX],
        });
        const translateY = streakProgress[index].interpolate({
          inputRange: [0, 1],
          outputRange: [star.startY, star.startY + star.travelY],
        });
        const opacity = streakProgress[index].interpolate({
          inputRange: [0, 0.04, 0.68, 1],
          outputRange: [0, 0.98, 0.44, 0],
        });
        const scale = streakProgress[index].interpolate({
          inputRange: [0, 0.08, 1],
          outputRange: [0.4, star.scale, 1.04],
        });

        return (
          <Animated.View
            key={`shooting-${index}`}
            style={[
              styles.shootingStarWrap,
              {
                opacity,
                transform: [
                  { translateX },
                  { translateY },
                  { rotate: "-32deg" },
                  { scale },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.shootingStarTail,
                {
                  width: star.length,
                },
              ]}
            />
            <View style={styles.shootingStarHead} />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  baseGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#040b16",
  },
  nebulaLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  topNebula: {
    position: "absolute",
    top: -170,
    right: -110,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "#1d4ed8",
  },
  topNebulaEcho: {
    position: "absolute",
    top: -70,
    right: 110,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#1e40af",
  },
  midNebula: {
    position: "absolute",
    top: height * 0.26,
    left: -130,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#0f766e",
  },
  bottomNebula: {
    position: "absolute",
    bottom: -200,
    left: -110,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: "#22d3ee",
  },
  ambientStar: {
    position: "absolute",
    backgroundColor: "#edf8ff",
    shadowColor: "#d9f7ff",
    shadowOpacity: 0.55,
    shadowRadius: 4,
  },
  accentStar: {
    position: "absolute",
    backgroundColor: "#ffffff",
    shadowColor: "#dff6ff",
    shadowOpacity: 0.95,
    shadowRadius: 9,
  },
  shootingStarWrap: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  shootingStarTail: {
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(191, 219, 254, 0.76)",
  },
  shootingStarHead: {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginLeft: -3,
    backgroundColor: "#ffffff",
    shadowColor: "#d7f4ff",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
