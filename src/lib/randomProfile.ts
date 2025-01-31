export function setRandomProfile(currentImg?: number, profileNumber?: number): { profile: number; profileNum: number } {
  const profileImages = {
    yellow: require('../assets/images/yellow_duzy.png'),
    pink: require('../assets/images/pink_duzy.png'),
    green: require('../assets/images/green_duzy.png'),
    blue: require('../assets/images/blue_duzy.png'),
  };

  const getRandom = () => Math.floor(Math.random() * 4);
  const profileNum = profileNumber === undefined ? getRandom() : profileNumber;

  switch (profileNum) {
    case 0:
      return profileImages.yellow === currentImg
        ? setRandomProfile(currentImg)
        : { profile: profileImages.yellow, profileNum: 0 };
    case 1:
      return profileImages.pink === currentImg
        ? setRandomProfile(currentImg)
        : { profile: profileImages.pink, profileNum: 1 };
    case 2:
      return profileImages.green === currentImg
        ? setRandomProfile(currentImg)
        : { profile: profileImages.green, profileNum: 2 };
    case 3:
      return profileImages.blue === currentImg
        ? setRandomProfile(currentImg)
        : { profile: profileImages.blue, profileNum: 3 };
  }

  return { profile: profileImages.blue, profileNum: 3 };
}
