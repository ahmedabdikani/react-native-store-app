import * as Linking from 'expo-linking';
import {LinkingOptions} from "@react-navigation/native"

// adb shell am start -d exp://192.168.1.102:19000/--/testing/reset-db
// const url = Linking.makeUrl("https://suristore.web.app");
const prefixes = [Linking.makeUrl('https://suristore.web.app')];

export default {
  prefixes,
  config:{
    screens:{
      Auth:{
        path:"auth",
        screens:{
          BottomTab:{
            path:"bottomtab",
            screens:{
              HomeStack:{
                path:"homestack",
                screens:{
                  Home:"home",
                  Product:"product"
                }
              },
              ProfileStack:{
                path:"profilestack",
                screens:{
                  Me:"me",
                Profile:"profile"
                }    
              }
            }
          },
          Intro:"intro",
          SignIn:"signin",
          SignUp:"signup"
        }
      },
      NotFound:"*"
    }
  },
  subscribe(listiner){

  }
  
} as LinkingOptions
