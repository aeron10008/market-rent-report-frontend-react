import React from 'react'

import appLogo from '../images/amplichat.png'

import coverImage from '../images/landing-page-background.jpg'
import offerBgImage from '../images/offer-background.jpg'

// endorsement images

// section images

import discordImage from '../images/discord.png'

export const initialState = {
    // when in dev, change appURL to local url
    // appURL: 'http://localhost:3000',  
    // when in production, change appURL to real url
    appURL: 'https://amplichat.com',

    appLogo: appLogo,
    appName: 'MarketRentReport',

    coverTitle: 'Stay Connected at Events',
    coverText: 'Chat with other attendees and make new friends at your favorite events and concerts.',

    coverImage: coverImage,
    offerBgImage: offerBgImage,

    detailPageTitle: `Search Details`,
    offerRentPageTitle: `We will email you the report.`,
    detailPageDescription: `Market Rent report allows people to find market rent for any Candadian address.`,

    discordImage: discordImage,
    discordLink: 'https://discord.com/invite/aFQPYyAVDq',
    //BC, AB, SK, MB, ON, QC, NL, NB, PE, NS
    provinces: [
        {
            value: 'BC',
            label: 'BC',
        },
        {
            value: 'AB',
            label: 'AB',
        },
        {
            value: 'SK',
            label: 'SK',
        },
        {
            value: 'MB',
            label: 'MB',
        },
        {
            value: 'ON',
            label: 'ON',
        },
        {
            value: 'QC',
            label: 'QC',
        },
        {
            value: 'NL',
            label: 'NL',
        },
        {
            value: 'NB',
            label: 'NB',
        },
        {
            value: 'PE',
            label: 'PE',
        },
        {
            value: 'NS',
            label: 'NS',
        },
    ],
    city: '',
    addresses: [],
    typesOfDwelling: [
        {
            label: "Apartment/Condo",
            value: "Apartment/Condo",
        },
        {
            label: "House",
            value: "House",
        },
        {
            label: "Townhouse",
            value: "Townhouse",
        },
        {
            label: "Basement",
            value: "Basement",
        },
    ],
    noBedrooms: [
        {
            label: "1 Bed",
            value: 1,
        },
        {
            label: "2 Beds",
            value: 2,
        },
        {
            label: "3 Beds",
            value: 3,
        },
    ],
    responseDetails: null,
    offerRent: [],
    errors: null,
    location: null,
    provinceSelected: '',
}

const initialContext = {
    state: initialState,
    dispatch: () => null,
}

export const Context = React.createContext(initialContext)
