import { StyleSheet } from "react-native"



const Sizes = {
  //global sizes

  base:10,
  font:14,
  radius:30,
  padding:10, 
  padding2:12,

  // fontSize
  h1: 48,
  h2 : 32,
  h3 : 20,
  h4 : 16,
  subtitle:18, 
  body1:16,
  body2:14,
}

const Fonts = StyleSheet.create({
  h1:{
    fontWeight:"bold",
    fontSize:Sizes.h1,
    margin: Sizes.base,
  },
  h2:{
    fontWeight:"bold",
    fontSize:Sizes.h2,
    margin: Sizes.base,

    
  },
  h3:{
    fontWeight:"bold",
    fontSize:Sizes.h3,
    margin: Sizes.base,


  },
  h4:{
    fontWeight:"bold",
    fontSize:Sizes.h4,
    margin: Sizes.base,
  }
  ,
  subtitle:{
    fontWeight:"bold",
    fontSize:Sizes.subtitle,
  }
  ,
  body1:{
    fontSize:Sizes.body1,
  }
  ,
  body2:{
    fontSize:Sizes.body2,
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
  centerSelf:{
    alignSelf:"center"
  },
  container:{
    padding:Sizes.base
  },
  
})

export {Fonts, Sizes, Styles}