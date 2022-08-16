import dayjs from 'dayjs';

function generateProposal() {
    return {
        airline: 'Azul Linhas Aéreas - AD',
        boarding: 'Congonhas - CGH',
        landing: 'Aluízio Alves - NAT',
        start: '20/08/2022',
        end: '05/12/2022',
        url: 'https://images.unsplash.com/photo-1604952846053-f5d7a8d6e89f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        name: 'Semana de férias Rio Grande do Norte',
        destiny: 'Natal',
        type: 'Travel',
        year: `${dayjs().year()}`
    }
}

const proposalFactory = {
    generateProposal
}

export default proposalFactory;
