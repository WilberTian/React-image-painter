import fetch from '../utils/fetch';

export default {
    getContactList: async () => {
        const fetchConfig = {
            url: '/api/getContactList'
        };

        const data = await fetch(fetchConfig);
        return data;
    },

    queryContactList: async () => {
        const fetchConfig = {
            url: '/api/queryContactList'
        };

        const data = await fetch(fetchConfig);
        return data;
    },

    getContactDetail: async (id) => {
        const fetchConfig = {
            url: '/api/getContactDetail',
            data: {
                contactId: id
            }
        };

        const data = await fetch(fetchConfig);
        return data;
    },

    saveContact: async (contact) => {
        const fetchConfig = {
            url: '/api/saveContact',
            method: 'POST',
            data: contact
        };

        const data = await fetch(fetchConfig);
        return data;
    }
};
