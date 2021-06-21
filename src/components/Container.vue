<template>
  <div class="container">
    <div class="welcome">
      <amplify-authenticator>
        <transition name="f" appear>
          <form @submit.prevent="Create()">
            <label>New item</label>
            <input type="text" v-model="msg" autocomplete="off" />
            <button>Add item</button>
          </form>
        </transition>
        <TodoList :TodoLists="TodoLists" :Delete="Delete" />
        <transition name="m" appear>
          <w-notification
            v-show="showNotification"
            warning
            bottom="true"
            round
            shadow
            transition="bounce"
          >
            Please enter a value
          </w-notification>
        </transition>
        <amplify-sign-out />
      </amplify-authenticator>
    </div>
  </div>
</template>

<script>
import TodoList from "./TodoList";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { API, graphqlOperation } from "aws-amplify";
import { listItems } from "../graphql/queries";
import { createItem, deleteItem } from "../graphql/mutations";
import { onCreateItem, onDeleteItem } from "../graphql/subscriptions";

export default {
  components: {
    TodoList,
  },
  data: () => ({
    user: {},
    loading: true,
    form: {},
    msg: "",
    showNotification: false,
    timeout: 2000,
    exampleData: [],
    TodoLists: [],
  }),
  created() {
    onAuthUIStateChange((state, user) => {
      if (state === AuthState.SignedIn) {
        this.user = user;
        this.getData();
      }
    });

    API.graphql(graphqlOperation(onCreateItem)).subscribe((sourceData) => {
      const newItem = sourceData.value.data.onCreateItem;
      if (newItem) {
        if (this.TodoLists.some((r) => r.id == newItem.id)) return;
        this.TodoLists = [newItem, ...this.TodoLists];
      }
    });

    API.graphql(graphqlOperation(onDeleteItem)).subscribe((sourceData) => {
      const removedItem = sourceData.value.data.onDeleteItem;
      if (removedItem) {
        this.TodoLists = this.TodoLists.filter((r) => r.id != removedItem.id);
      }
    });
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const r = await API.graphql(graphqlOperation(listItems));
        this.TodoLists = r.data.listItems.items;
      } catch (error) {
        console.log("There was an error loading the items...".error);
      } finally {
        this.loading = false;
      }
    },
    async createItem() {
      const name = this.msg;
      const item = { name };
      try {
        const r = await API.graphql(
          graphqlOperation(createItem, { input: item })
        );
        console.log("Item created...");
        this.TodoLists = [...this.TodoLists, r.data.createItem];
      } catch (error) {
        console.log("There was an error creating the item...", error);
      }
    },
    async deleteItem(id) {
      if (id) {
        try {
          await API.graphql(
            graphqlOperation(deleteItem, { input: { id: id } })
          );
          console.log("Item deleted...");
          this.TodoLists = this.TodoLists.filter((r) => r.id !== id);
        } catch (error) {
          console.log("There was an error deleting the item...", error);
        }
      }
    },
    Create() {
      setTimeout(() => {
        this.showNotification = false;
      }, this.timeout);

      if (this.msg.length) {
        this.createItem();
      } else {
        this.showNotification = true;
      }
    },
    Delete(idx) {
      this.deleteItem(idx);
    },
  },
};
</script>

<style scoped>
.f-enter-from,
.f-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
.f-enter-to,
.f-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
.f-enter-active,
.f-leave-active {
  transition: all 0.5s ease;
}
.m-enter-active {
  animation: shake 0.5s ease-in;
}
@keyframes shake {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  25% {
    transform: translateX(-10px);
    opacity: 1;
  }
  50% {
    transform: translateY(-40px);
  }
  75% {
    transform: translateY(0px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>