import AppActor from "./domain";
const config : any  = {
    sync: {
        active: true,
        delay: 10000
    },
      paths: {
          pull: "/pull", 
          push: "/push", 
      },
      actorTypes: { AppActor }
}

export { config }