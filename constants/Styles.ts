import { StyleSheet } from "react-native"


const Sizes = {
  //global sizes

  base:10,
  font:14,
  radius:30,
  padding:10, 
  padding2:12,

  // fontSize

  largeTitle:30,
  h1:24,
  h2:20,
  h3:18,
  h4:16, 
  body1:20,
  body2:16,
  body3:14,
  body4:12,

  


}

const Fonts = StyleSheet.create({
  largeTitle:{
    fontWeight:"normal",
    fontSize:Sizes.largeTitle,
    lineHeight:30,
  },
  h1:{
    fontWeight:"bold",
    fontSize:Sizes.h1,
    lineHeight:24,
  },
  h2:{
    fontWeight:"bold",
    fontSize:Sizes.h2,
    lineHeight:22,
  },
  h3:{
    fontWeight:"bold",
    fontSize:Sizes.h3,
    lineHeight:20,
  }
  ,
  h4:{
    fontWeight:"bold",
    fontSize:Sizes.h4,
    lineHeight:18,
  }
  ,
  body1:{
    fontWeight:"normal",
    fontSize:Sizes.body1,
    lineHeight:30,
  }
  ,
  body2:{
    fontWeight:"normal",
    fontSize:Sizes.body2,
    lineHeight:22,
  },
  body3:{
    fontWeight:"normal",
    fontSize:Sizes.body3,
    lineHeight:22,
  },
  body4:{
    fontWeight:"normal",
    fontSize:Sizes.body4,
  },

});

const Styles =StyleSheet.create( {
  centerH:{
    alignItems: "center",
  },
  centerV:{
    justifyContent: "center",
  },
  centerHV:{
    alignItems: "center",
    justifyContent:"center"
  },
  fRow:{
    flexDirection: "row",
  },



})

export {Fonts, Sizes, Styles}