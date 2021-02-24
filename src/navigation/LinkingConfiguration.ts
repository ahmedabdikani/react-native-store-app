import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      BottomTab: {
        screens: {
          HomeStack:{
            screens: {
              Home: "Home",
              Product:"Product"
            },
          ChatStack:{
            screens: {
              Rooms:"Rooms"
            }
          }
          }, 
        },
      },
      Auth:{
        screens: {
          Intro:"Intro",
          SignIn:"SignIn",
          SignUp:"SignUp"
        }
      },
      NotFound: '*',
    },
  },
};
