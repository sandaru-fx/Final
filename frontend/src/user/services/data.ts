import { Dog, DogStatus, MatchRequest, ChatConversation, ChatMessage, Notification } from "../types";

export const MOCK_DOGS: Dog[] = [
  {
    _id: "101",
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    gender: "Male",
    location: "San Diego, CA",
    distance: 2.5,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA8_JoR5T9zMKZ1vVTrz9DTFoqGnme5-R5mT-QNpqs3hbPkVmrSsvxVVN8kHyGML5laBrP3pbDTmasethalOsS4QUXpoo6BZWw0T_-DEU9XN3Od-mTKyADvo4fYzRir9tMJR6fRNtdGoX6H3593G2H0EdoRAIeL-btFP1BmJ4657xVGUOnEl-rHwjQM6Nmoms0BwzoOUYLZhLn_d0hz4Nh3fffhyp3u3wlZTOEysDR5rJC8YoF6l6N6UYrrS8KKN1_5F-n9EboevmY"],
    description: "Max is super friendly.",
    ownerId: "1", // Updated to match default user ID
    weight: 70,
    status: DogStatus.APPROVED,
    healthStatus: { vaccinated: true, geneticScreening: true }
  },
  {
    _id: "102",
    name: "Luna",
    breed: "Pug",
    age: 2,
    gender: "Female",
    location: "New York, NY",
    distance: 5.1,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBH9mztvxwOGrZ_jvT4VaG0Kuo10jFRxqzvxn6ZvfF8JjXEYaXkQSLAnv5vBGzh7MnQBoWJckDEb_xr7-DS4S-e2WfpHh0rRd-Y-DxgBqAkiUsuyaWs6bkyrx0dIJfRoZi36oyxAIUlgZgdRVbyHQV-IsAk827K22Mn1kt-8npkj4BvD8PnzY-lJ3VeQFZ_UphXOoIfIGUK26-V4L0ME0BfmKg_tfV_qDg_EV9yw49FmUCPvOLiLdLaKNDhD1hdqMFaazk1TDYZPp4"],
    description: "Luna loves naps.",
    ownerId: "u2",
    weight: 18,
    status: DogStatus.APPROVED,
    isNew: true
  },
  {
    _id: "103",
    name: "Charlie",
    breed: "English Bulldog",
    age: 4,
    gender: "Male",
    location: "Austin, TX",
    distance: 1.2,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCK6_Doqwi6WWsFnJx-7fvxtKCI71NejyvADH0u-22LZv3iLkkYeGNdVQ3TUcbpSZxWc496jCQaD-mt6J3U3lvxRPtfTD-7rUMszPVCcuegs52XYiIorPJjprADaORY8tgsGtlFDNoKagjNFSDZxlZHu9pxTIJjuiaf3I1TIiWfJJzH-t_NXLN_4f2bMn6YtubimpFPRGhhhTcmhlpEDmC2hgUufuVqNuMwuvK6ZCOCtZviR7b6LRyQfHO49S66WbvGRrXR28oL-xQ"],
    description: "Charlie is a tank.",
    ownerId: "u3",
    weight: 50,
    status: DogStatus.APPROVED
  },
  {
    _id: "104",
    name: "Daisy",
    breed: "Australian Shepherd",
    age: 1.5,
    gender: "Female",
    location: "Seattle, WA",
    distance: 8,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCo1xnUUnqsRwp6QxxuirG53fsgR6MmuKntxAfB1yLZ9T3Ynwxo58sMImqh-Fj3_4CQkdnzCAPKhbDv7JZkFyU8KoMbnS7FkJ-GSk9vs08sqaMa_SwdDfMPfj16abIinclOuKVDJh7H4cy3OrIVUN3OpLO-1Vhhwf8cUgxv-jznI2PnbYdFJoh-vi5kDC4mVBN0lPBkNy_2-306uER3vzH3q91PKDGdfVRbsdvHADzRYFmSfD_oAMtYaLI_d67nC-3w8g4WLsrhEgo"],
    description: "High energy pup!",
    ownerId: "u4",
    weight: 40,
    status: DogStatus.APPROVED,
    healthStatus: { vaccinated: true, geneticScreening: false }
  },
  {
    _id: "105",
    name: "Buddy",
    breed: "Border Collie",
    age: 5,
    gender: "Male",
    location: "Portland, OR",
    distance: 12,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDmZAecmyD-KG3Si6dIMHrkdqlKqQFqc3yy5CwFQA7xdgtA3i9Kk2_Wm0PghYw3lKnJzWbVcrn7xmXWmQr2ZIoHXdf3nSBt4kI6yV2LYBzRITlKKFFsM9nf5C7pkMAddxMpgUzG3mGbnavncZDCpondVvliFfXaG35JHZyKyA9KDnxjigzUEwWRmAYj3F1TaX75NwzmwEZv7lJmHVGemFZwus9rmVu--4GiKnjPV3GibJ0ZuJoroPk6OG-pgl4twDgzKVgnn5nauxo"],
    description: "Buddy is a very good boy.",
    ownerId: "u5",
    weight: 45,
    status: DogStatus.APPROVED
  }
];

export const MOCK_REQUESTS: MatchRequest[] = [
    // Incoming
    {
        id: 'inc1',
        type: 'incoming',
        dog: {
            name: 'Bailey',
            breed: 'Golden Retriever',
            age: 2,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd-5F4dDPX_ahQ3BdeylfPs26w9cVvdjMJN_NcocSTPuGY9-U6e0DB3oZR5oEyoJaw6P3LyNy8D4431kneC727gIUdpHElVfsUcclI6i5ujHkUY8Unfo8sPNNQikBly6pwTyvRZb2wwTBclCi9cAR5JTP7NaxzR0_2lrj2eADIRJ_dvas5nENrG2XmPPjpPUCsY-7H9ec0J2MTWhbZoAxnaSz3m6zwnZC9-Dy7lJSLAdgCrMYswqysDnnhCI_TLJg2bxj_Spl2lhw'
        },
        owner: {
            name: 'Sarah',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Jub09q8Jl13KhU2jE2bE7EL-lAosc3rXDV_A5CVav9mI9xX6VGrjGWgUqi3BYfNCTDx__VwqIdF2Va7NsEVsFmHlx6KAXZCDyXKbt4kw8WEaCSRTrGetw-UC759ScPpaSK66HD4QTSxwbakB_pH3C_x__f0pJPsx5QoyHIMHjo1oGxQ_ukKPIAFsjv2rtjtkuGr84IeyLohfFaPbdo6ixG5HAqBp3VlM78CIdNbQZfJzTX6oftyDQjOfDZsa6GSOm-0aZp7cR_A'
        },
        timestamp: '2h ago',
        matchPercent: 95
    },
    {
        id: 'inc2',
        type: 'incoming',
        dog: {
            name: 'Rocky',
            breed: 'French Bulldog',
            age: 4,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6VRBxWmmsjwyx_zCoZ_ML5P-xQuN9kmFWoANOYNTai1dgJfrLR2fBx0gXfqyWC4G5AYMA9KTbi_aquO_Z47uWF-VZ40BNryFEtGqRBIn6lCS43n1Qh_UtG6boYMNvRb9_c8Ilv8TFT3tLtEz0iDrHL8eXFrmtlunvq9lUwpkw5RDyosXz7QH5fV3Qk1jDwV0I9_dkdRMgIiFbgUBlzQftKtkrB8L-IEG2ftMnWAWgqUw0Zs0839JoJC2mZqTfyDTkjla77lAxBSw'
        },
        owner: {
            name: 'Mike',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaj4hEJJw1tfGrIXn0WzHuzyt-_Dh05vqk0V7a74FuJt9nyAKjIpTCKPR9lkd0rOAqRUyu18r4cX3b0_7omni_wMQHlJb44I-vx6YJ7P7KBzgbtkWElyB4w9DhC6nYAzb8K8dmpNyh-GobF-kOqz3E_OtIraAv5OOkm-6Vu3BEPSJ53SCFdJpxakErV9cMZPTGAV3fybwVZze51VVtUIWHuCzK7KmmRMvgJ37mK3KEF3XN_mJb2nhMbDxqAWZRtKamxFHJviYPznc'
        },
        timestamp: '5h ago'
    },
    {
        id: 'inc3',
        type: 'incoming',
        dog: {
            name: 'Luna',
            breed: 'Samoyed',
            age: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY4zVVNVFOg56GBu8aXqVOyCzvUjX3KjaDN-xyoIFt9G7Ic3hfMooY-ajbk5c6JH6SI5O_0U7qzySH347NAuuSV-l4MC4Edpz424qWu0oja0PU9IUNL76mF1uEtbYdtnve8h7wqHRUX9fxXoBisVtPs6MStGu3pZnuI-eEFNaEBGJ3dAq0nh6PFd3kco5LbKyXPsIED6FK4xPvmwxx_Go42Hr2civWQmTfg_fMcIgYXFKWwEZom0BzG-DGHlR2EUyqpG83TUi5L4Q'
        },
        owner: {
            name: 'Jessica',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIIpR6PgODZ5mMqsa4risXZku8xfnnd98mhEDDRbRI4V-jYjx-HXAqkL9Bw0dzbSo4c0Kd-EL-FBoqS_8UFjgO-0JxsPb051L6UW0xuzvV90dr7RiPcowwTMnBH1GS5aAxq7QaoiXUqSy_QFiP2kRXpNsPBT5u6q0XUlZ8vS1Ji3Q7Bj9MMKtKHAwB4KJcMm5yAdxaba6O8B2K3L69sgtQxN3a4fun2Jjw7O61huLTEwcIRral9irGKVdfnbvRsE-fhZqvPfuu7wQ'
        },
        timestamp: 'Just now',
        isNew: true
    },
    // Sent
    {
        id: 's1',
        type: 'sent',
        dog: {
            name: 'Winston',
            breed: 'Corgi',
            age: 3,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYr5-pYFJVAjCSgtJS5U_soNtHBH0gAaDASpbSKShNHRONjpjhPCIJpAApsU_YJ-jKa4GU1c3cpYz6qP0tCA3oQCZwtk4EpCFwJX29tdtbsgQGC-v6bZZqYjgccrtkI13zgyjeNmrmNoWKkaZa_QDwqwfBNQ4HY2i9KYd-pWqvrFfLa0ytMsy4082BDLFDK0M4K2lOLH5quE4AXglBFUN2pMeWX6ArfwfEvUqliEYpxD2OxaaPY5z2-nLUxZJtV2CApuVd-C_zSpM'
        },
        timestamp: 'Sent yesterday',
        status: 'pending'
    },
    {
        id: 's2',
        type: 'sent',
        dog: {
            name: 'Max',
            breed: 'Border Collie',
            age: 5,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3B8SI8AHYv9eC-BFVK-rb1CY_9HQ7VdEAmx496lESdZy_IkQfgfnclj-eY54PGMqTioYxgsmidekatE7MoOdFPUPGlpGPhnr61cD6F8SWNnb6dYjXBfGLtIlOZeMxjmPtR4bDIt_AQJVpgeMHOyTbAyqYYC84rx9yzvOdaYwpPN_YGpVqguM9fwkBiTIwKJiRO7E1jWfdT4MGvKPqx5KCryC2FfuNZHJ-JVkHvuapGMlfSxDvfgaaXDIoDab-11Atd8lHiaG9JNI'
        },
        timestamp: 'Accepted 1h ago',
        status: 'accepted'
    }
];

export const MOCK_CHATS: ChatConversation[] = [
  {
    id: "c1",
    dogName: "Max",
    ownerName: "Sarah",
    dogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9WeKyaHNt7wUrksFMJcOBIdnxbt1SY6ehBrNPU9d_SHUOGHbBtv5sWq0mVHiUvjiOc6NDsTn7yb27pZ7KVTc6oog9WABIeF5gNrBLA6buywLIGvsgqNEQp0KPcA_gxfas4qbSejfT09xFHPlzPcuJHUB9QobORIUj8fLrUbpOhQOYg3J8f8H5WllZ-lCqztP4U4p2w4VgCwDwEPk7xtpnCmoX3eS4fmmxlPDM17C-2hN7ntxxQWUnHFgVAklMlNs2PSiqig1WjrQ",
    lastMessage: "Sure, let's meet at the park!",
    lastMessageTime: "Now",
    isOnline: true,
    dogBreed: "Golden Retriever"
  },
  {
    id: "c2",
    dogName: "Luna",
    ownerName: "Mike",
    dogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeQKB3rTCkNVpcYhhrP4xto79aTS2ITF4LGDUZw62BNCjEIIKyDWSr9AqxishJZwIJ3-nOp6H8q_btzO8WECYqI3j-qdNw27RrV-ZYkp2HWDBZ-X1Ty2iRcX668SEh0pPaPkQYezxMlzMA1OgWVyllcKVLvLZSCFtWnkKVB1S4paqyq3CUV9iKcEWxS5zCeK3asmWWvJE7BXwPkm40IJq--N1KVhr1aFSH0APjuz7CjZgpGNsCY07K0u876m532GOnmC2oe7hhPAY",
    lastMessage: "Are you looking to breed soon?",
    lastMessageTime: "2m",
    isOnline: false,
    dogBreed: "Husky"
  },
  {
    id: "c3",
    dogName: "Rocky",
    ownerName: "Jen",
    dogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5XfhuXdEA7wrZWCqQzoml-KFX0MD-zkb4cHdfsu4V1zwTpRhPRjou_CVTxVVW74trD9Ce_bUihjlugrKofqt61Y1TKNKLpchicHUp5ngvaShzhUw_JQE6HWL3FMWb3PW-Y9GxIFH7kfJZj2zM-PoNgS3Pjk57j4W1I3eBCt71uVmLFGa2oqr-S3bcucQKn4V01r66jwGZmFiGFo0pEHHJD5MiyIH2UlOofj4zSznXeoItAjPumqE1Oq7GrZKtgiNz2zLl4JmFb48",
    lastMessage: "He is very playful!",
    lastMessageTime: "1h",
    isOnline: false,
    dogBreed: "Bulldog"
  },
  {
    id: "c4",
    dogName: "Bella",
    ownerName: "Tom",
    dogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-d6mwF-W0nhsvlppt8WdPAfXOsu89QPWNgxz5a9X-h3lvs-Wa4EeNuJmoMew6Dcthza_OvNp0BzVmmgySxkrpBox4Y5mCiC4uuIRaF1fKwNQbEAFq8bkyARRJ_QQ7u4di1scoaKztihC9B52td7Gz8E9cWE1xMAMhM7ZeostycXnbUjIbXw9KwlEkZJc7XcqvUezg13K8AeQYmF3fgljamxcvxsHI8rZChJZq005NhZLEJZLax8GLKqtrysbT1atIup-j9djA_KQ",
    lastMessage: "Matched with Bella",
    lastMessageTime: "1d",
    isOnline: false,
    dogBreed: "Poodle"
  }
];

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  "c1": [
    { id: "m1", text: "Hi there! I love Max's profile. He looks so energetic!", sender: "them", timestamp: "10:30 AM" },
    { id: "m2", text: "Thanks! Your Bella looks adorable too. We go to Central Park every weekend.", sender: "me", timestamp: "10:32 AM" },
    { id: "m3", text: "That sounds perfect. Are you looking to breed soon?", sender: "them", timestamp: "10:35 AM" },
    { id: "m4", text: "Yes, definitely. Maybe we can meet up first so they can play?", sender: "me", timestamp: "10:36 AM" }
  ]
};

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'n1',
        type: 'match_request',
        category: 'Matches',
        title: 'Buddy sent you a match request!',
        timestamp: '2 mins ago',
        isRead: false,
        data: {
            dogName: 'Buddy',
            dogBreed: 'Golden Retriever',
            dogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4B2NrZVrqoiPicnh46C6dfMdmzQp67gXZS7xhg6TMvEWIY4WLUC7jinHaL7fUblLn-VzPTcpKueYKp2He1Gqm1eg1z507ntRr3UGO7gCee0yCmZckE4Feqans04vd3RRouUg7iF911RfuJjYT6QENDmwn9xfQCZJusPTcL90b5N3R5bvhxVCwBBOpQc26HVFuWAVczg-guknNNE0jwMuCBPWfuwb9wxPu0h3K_A-2C3Xe5MEaRLM6FdwpowqWajuB-ICDCm6E4jM'
        }
    },
    {
        id: 'n2',
        type: 'system',
        category: 'System',
        title: 'Your profile has been approved by the admin team.',
        timestamp: '4 hours ago',
        isRead: false
    },
    {
        id: 'n3',
        type: 'match_accepted',
        category: 'Matches',
        title: 'Luna accepted your match request.',
        timestamp: 'Yesterday',
        isRead: true,
        data: {
            dogName: 'Luna',
            dogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp6RuC867ZuC-V2Nr9YgUQns92DbaQtoboYam8zMOfyoO9gYEq6iiTd1_mDq8FgKAk_i2DjcKcCAMSSmkpYkissP28j5Q7iUXH8iM9W2MTk_L5ZN3-Gq4JmR7_5-l8kEAQTj5hPleNw92YdXhpQzWw7TGfIxZXNoxAbeMDIKb1BrzyEwNwn3oFIbBXpxTBHxjEErLvwg_eSwwWOLDLLqfMoTgOkZqLY7f3jDl8aFphzvVl4T7ZEQQRmcDFTnS72-GGlwaTaP3imbk'
        }
    },
    {
        id: 'n4',
        type: 'payment',
        category: 'Payments',
        title: 'Payment successful for Premium Plan.',
        timestamp: '2 days ago',
        isRead: true,
        data: {
            planName: 'Premium Plan'
        }
    },
    {
        id: 'n5',
        type: 'match_rejected',
        category: 'Matches',
        title: 'Max declined your match request.',
        timestamp: '3 days ago',
        isRead: true,
        data: {
            dogName: 'Max',
            dogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAeYCdKEch56kkUTiQArrMMP54xROP01ZkRd9jL5ZvR_FovmMEeLHOkHveQZuQF9QD2Moys5wjdfYwSI0mBuyITZBErD-_WkSNhqlKWWoTX34huba1roJFJ0bXWihYYaI4j7llMdxVrH9iRm96Fyy2IkGi2VGUEUmI4t7cn3bNlZ_E9HYwbcaDKgf_CioItv-w9s8FAFMag_0JyVOiiUJVYs0bZpJWvpqk8QOuZ0kfq6A2v7XMwvJ4522idY2Ql_Hithhw3RGQoy8'
        }
    }
];