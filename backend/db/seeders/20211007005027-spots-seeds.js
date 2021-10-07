'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spots', [
        {
          fullAddress: "Dornie, Kyle of Lochalsh IV40 8DX, United Kingdom",
          lat: 57.48446481263117,
          lng: -5.40315671963956,
          spotName: "Eilean Donan Castle",
          price: 500.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg/383px-Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Castle Road End, Dumfries DG1 4RU, United Kingdom",
          lat: 55.3334412856341,
          lng: -3.5354802375348724,
          spotName: "Caerlaverock Castle",
          price: 450.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Caerlaverock_Castle_from_the_air.jpg/450px-Caerlaverock_Castle_from_the_air.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Appin PA38 4BL, United Kingdom",
          lat: 56.71278087130002,
          lng: -5.383831943644952,
          spotName: "Castle Stalker",
          price: 550.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Castle_Stalker_-_geograph.org.uk_-_204092.jpg/375px-Castle_Stalker_-_geograph.org.uk_-_204092.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Bamburgh NE69 7DF, United Kingdom",
          lat: 55.84448921385617,
          lng: -1.7018837513144025,
          spotName: "Bamburgh Castle",
          price: 675.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bamburgh_2006_closeup.jpg/450px-Bamburgh_2006_closeup.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Alnwick NE66 1NQ, United Kingdom",
          lat: 55.62627992399523,
          lng: -1.715725661811888,
          spotName: "Alnwick Castle",
          price: 600.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Alnwick_Castle_02.jpg/450px-Alnwick_Castle_02.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Castle St, Criccieth LL52 0DP, United Kingdom",
          lat: 53.0614756969584,
          lng: -4.207269545589252,
          spotName: "Castell Criccieth",
          price: 450.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Criccieth_Castle_-_geograph.org.uk_-_597029.jpg/375px-Criccieth_Castle_-_geograph.org.uk_-_597029.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Welshpool SY21 8RF, United Kingdom",
          lat: 52.944860568040184,
          lng: -3.155284347780522,
          spotName: "National Trust - Powis Castle and Garden",
          price: 500.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Powis_Castle_2016_124.jpg/330px-Powis_Castle_2016_124.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Castle Sq, Ludlow SY8 1AY, United Kingdom",
          lat: 52.60153033307975,
          lng: -2.698501301363574,
          spotName: "Ludlow Castle",
          price: 600.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ludlow_Castle_from_Whitcliffe%2C_2011.jpg/375px-Ludlow_Castle_from_Whitcliffe%2C_2011.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Castle Green, Kenilworth CV8 1NG, United Kingdom",
          lat: 52.55105959475292,
          lng: -1.5357808195749814,
          spotName: "Kenilworth Castle and Elizabethan Garden",
          price: 600.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kenilworth_Castle_gatehouse_landscape.jpg/450px-Kenilworth_Castle_gatehouse_landscape.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Broughton Castle, Banbury OX15 5EB, United Kingdom",
          lat: 52.2215820530271,
          lng: -1.3973617146001478,
          spotName: "Broughton Castle",
          price: 600.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Broughton_castle2.jpg/330px-Broughton_castle2.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Pembroke SA71 4LA, United Kingdom",
          lat: 51.92380048629138,
          lng: -4.940890801955864,
          spotName: "Pembroke Castle",
          price: 575.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Pembroke_Castle_-_June_2011.jpg/375px-Pembroke_Castle_-_June_2011.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "White Hill, Berkhamsted HP4 1LJ, United Kingdom",
          lat: 51.98351572935602,
          lng: -0.6637404582335353,
          spotName: "Berkhamsted Castle",
          price: 475.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Berkhamsted_Castle_Jan_2007.jpg/375px-Berkhamsted_Castle_Jan_2007.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Windsor SL4 1NJ, United Kingdom",
          lat: 51.70988211028928,
          lng: -0.5253213532587047,
          spotName: "Windsor Castle",
          price: 675.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Windsor_Castle_at_Sunset_-_Nov_2006.jpg/375px-Windsor_Castle_at_Sunset_-_Nov_2006.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Castle Hill, Rochester ME1 1SW, United Kingdom",
          lat: 51.389957744199506,
          lng: 0.5014518121866981,
          spotName: "Rochester Castle",
          price: 475.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rochester_Castle_Keep_and_Bailey_0038stcp.JPG/600px-Rochester_Castle_Keep_and_Bailey_0038stcp.JPG",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Hever Rd, Hever, Edenbridge TN8 7NG, United Kingdom",
          lat: 51.40005345002988,
          lng: -0.01317066485182366,
          spotName: "Hever Castle & Gardens",
          price: 600.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hever_Castle_2014_06_20_1.jpg/338px-Hever_Castle_2014_06_20_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Bodiam, Robertsbridge TN32 5UA, United Kingdom",
          lat: 51.00241451331841,
          lng: 0.543484625674327,
          spotName: "Bodiam Castle",
          price: 700.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Bodiam-castle-10My8-1197.jpg/375px-Bodiam-castle-10My8-1197.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Arundel BN18 9AB, United Kingdom",
          lat: 51.00979553192081,
          lng: -0.5114794427612194,
          spotName: "Arundel Castle",
          price: 500.00,
          imageUrl: "https://www.arundelcastle.org/wp-content/uploads/2019/11/arundel-castle-set-on-a-hill-1024x682.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "The Square, Corfe Castle, Wareham BH20 5EZ, United Kingdom",
          lat: 50.80905214546581,
          lng: -2.006405776489412,
          spotName: "National Trust - Corfe Castle",
          price: 700.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Corfe_Castle%2C_Dorset.jpg/450px-Corfe_Castle%2C_Dorset.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Restormel Rd, Lostwithiel PL22 0EE, United Kingdom",
          lat: 50.660119833598,
          lng: -4.747104054991098,
          spotName: "Restormel Castle",
          price: 670.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/RestormelCastle.JPG/375px-RestormelCastle.JPG",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullAddress: "Castle Dr, Falmouth TR11 4LP, United Kingdom",
          lat: 50.36083329191669,
          lng: -5.120835638423146,
          spotName: "Pendennis Castle",
          price: 570.00,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pendennis_Castle.jpg/375px-Pendennis_Castle.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Spots', null, {});
  }
};
