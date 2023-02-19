export default function _charLimits(char: string, max: number = 50) {
  try {
    if (char?.length > max + 10) {
      return char?.substring(0, max) + "...";
    } else if (char?.length > max) {
      return char?.substring(0, max) + "...";
    } else {
      return char;
    }
  } catch (error) {
    console.log(error);
  }
}
