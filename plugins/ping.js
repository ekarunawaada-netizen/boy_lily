module.exports = {
    name: 'ping',
    command: ['p'],
    category: 'main',
    desc: 'Check bot response speed',
    async run(DinzBotz, m, { speed, runtime }) {
        const timestamp = speed();
        const latensi = speed() - timestamp;
        m.reply(`Pong!!\nSpeed: ${latensi.toFixed(4)} ms\nRuntime: ${runtime(process.uptime())}`);
    }
}
