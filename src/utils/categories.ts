
export const CATEGORIES = {
    hardware: {
        name: "Hardware",
        price: 200
    },
    software: {
        name: "Software",
        price: 150

    },
    support: {
        name: "Suporte",
        price: 100
    },
    backup: {
        name: "Backup",
        price: 100
    },
    others: {
        name: "Outros",
        price: 0
    },

}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>;