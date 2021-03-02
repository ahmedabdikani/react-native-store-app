import { StyleSheet } from "react-native"

const Sizes = {

  //global sizes
  base:10,
  font:14,
  radius:30,
  padding:10, 
  padding2:12,

  // fontSizes from material.io
  h1: 96,
  h2 : 60,
  h3 : 48,
  h4 : 34,
  h5: 24,
  h6:20,
  subtitle1:18,
  subtitle2:16, 
  body1:16,
  body2:14,
  button:14,
  caption:12,
  overLine:10
}

const Fonts = StyleSheet.create({
  h1:{
    fontFamily:"lobster",
    fontWeight:"300",
    fontSize:Sizes.h1,
    margin: Sizes.base,
    letterSpacing:-1.5
  },
  h2:{
    fontWeight:"300",
    fontSize:Sizes.h2,
    margin: Sizes.base,
    letterSpacing:-0.5
    
  },
  h3:{
    fontWeight:"400",
    fontSize:Sizes.h3,
    margin: Sizes.base,
    letterSpacing:0
  },
  h4:{
    fontWeight:"400",
    fontSize:Sizes.h4,
    margin: Sizes.base,
    letterSpacing:.25
  },
  h5:{
    fontWeight:"400",
    fontSize:Sizes.h4,
    margin: Sizes.base,
    letterSpacing:0
  },
  h6:{
    fontWeight:"500",
    fontSize:Sizes.h4,
    margin: Sizes.base,
    letterSpacing:.15,
  },
  subtitle1:{
    fontWeight:"600",
    fontSize:Sizes.subtitle1,
    letterSpacing:.15
  },
  subtitle2:{
    fontWeight:"600",
    fontSize:Sizes.subtitle2,
  letterSpacing:.1
  }
  ,
  body1:{
    fontWeight:"400",
    fontSize:Sizes.body1,
    letterSpacing:.5
  }
  ,
  body2:{
    fontWeight:"400",
    fontSize:Sizes.body2,
  letterSpacing:.25
  },
  button:{
    fontSize:Sizes.button,
    fontWeight:"500",
    textTransform:"uppercase",
    letterSpacing:1.25
  },
  caption:{
    fontSize:Sizes.caption,
    fontWeight:"400",
    letterSpacing:.4
  },
  overLine:{
    fontSize:Sizes.overLine,
    fontWeight:"400",
    letterSpacing:1.5   
  }
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
  centerSelf:{
    alignSelf:"center"
  },
  flex:{
    flex:1
  },
  container:{
    padding:Sizes.base
  },
  
})

export {Fonts, Sizes, Styles}