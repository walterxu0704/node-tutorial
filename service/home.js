module.exports = {
    async index() {
        console.log('home index');
        var message = await 'home service';
        return message;
    },
}