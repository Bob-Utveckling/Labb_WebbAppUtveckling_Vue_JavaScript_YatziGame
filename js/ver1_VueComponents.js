Vue.component('start-game-component', {            
    methods: {
        startGame: function() {
            app.startGame();
        }
    },
    template: `
        <div class="newplayercomponent">               
            <button class="button1"
                v-on:click="startGame"
            >
                Börja spela
            </button>
        </div>
    `
})


Vue.component('add-new-player-component', {            
    props: [ 'name'],
    methods: {
        //function here not called. v-on:click emits instead
        showPlayerName: function() {
            //alert(this.name);
            app.runThisFunction();
        }
    },
    template: `
        <div class="newplayercomponent">
            Namn: {{ name }} <br>
            <input v-model="name">                
            <button class="button1"
                v-on:click="$emit('enter-name', name)"
            >
                Add Player
            </button>
        </div>
    `
})