type RGBColorType = { red: number; green: number; blue: number };

const green: RGBColorType = {
  red: 68,
  green: 206,
  blue: 20,
};
const orange: RGBColorType = {
  red: 252,
  green: 229,
  blue: 27,
};
const red: RGBColorType = {
  red: 237,
  green: 33,
  blue: 33,
};

const colorGradient = (fadeFraction: number, rgbColor1: RGBColorType, rgbColor2: RGBColorType, rgbColor3: RGBColorType) => {
  let color1: RGBColorType = rgbColor1;
  let color2: RGBColorType = rgbColor2;
  let fade: number = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  const diffRed = color2.red - color1.red;
  const diffGreen = color2.green - color1.green;
  const diffBlue = color2.blue - color1.blue;

  const gradient = {
    red: parseInt(String(Math.floor(color1.red + diffRed * fade)), 10),
    green: parseInt(String(Math.floor(color1.green + diffGreen * fade)), 10),
    blue: parseInt(String(Math.floor(color1.blue + diffBlue * fade)), 10),
  };

  return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
};

export const trafficLightColor = (value: number, min: number, max: number) => {
  // range calc
  // (value - min) / (max - min)

  const fadeFraction = parseFloat(Number((value - min) / (max - min)).toFixed(1));
  const rgb = colorGradient(fadeFraction, green, orange, red);

  return rgb;
};
