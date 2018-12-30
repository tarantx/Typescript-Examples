import AppActor from "./domain/AppActor";
const config : any  = {
    sync: {
        active: true,
        delay: 1000
    },
      paths: {
          pull: "/pull", 
          push: "/push", 
      },
      ActorTypes: { AppActor }
}

export { config }