<template>
    <div class="admin">
        <AdminHeader/>
        <div class="add_contain">
            <div id="add_side">
                <navBar/>
            </div>        
            <div id="add_display">
                <router-view/>
            </div>
        </div>

        
        
    </div>
   
</template>

<script>
    import Header from '@/components/header.vue'
    import navBar from '@/components/navBar.vue'

    export default {
        name:'layout',
        components: {
    Header,
    navBar,
}
    }
</script>

<style>
    .add_contain{
        display: flex;
    }

    #add_side{
        width: 20%;
        border-right: solid 1px black;
        
    }

    #add_display{
        width: 100%;
        padding: 10px;
        text-align: left;
    }



</style>