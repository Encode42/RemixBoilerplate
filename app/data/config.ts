import { ColorScheme, MantineColor } from "@mantine/core";

interface Config {
    "accentColor": MantineColor,
    "colorScheme": ColorScheme
}

export const config: Config = {
    "accentColor": "blue", // UPDATE: MantineColor
    "colorScheme": "dark"  // UPDATE: ColorScheme
}
