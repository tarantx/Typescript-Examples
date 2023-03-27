import { Actor, ActorMessage, IMaterializer } from 'tarant'
import React from 'react';
import ReactDOM from "react-dom";

const baseProps = [
    "self",
    "materializers",
    "scheduled",
    "topicSubscriptions",
    "busy",
    "id",
    "partitions",
    "system",
    "supervisor",
    "__internals"
]
/* tslint:disable */
export class ReactRenderer implements IMaterializer{
  root: any
  
  public onInitialize(actor: Actor): void {
    //
    const localActor: any = actor
    localActor.__internals = localActor.__internals || {}
    localActor.__internals.react = Object.getOwnPropertyNames(actor)
        .filter(prop => !baseProps.includes(prop))
        .map((name) => {
            return {name, prop:actor[name] }
        })
    const domContainer = document.getElementById(localActor.id);
    this.root = ReactDOM.createRoot(domContainer);
    this.root.render(localActor.render(localActor.__internals.react.reduce((acc,value) => {
        acc[value.name]=value.prop
        return acc
    },{})))
  }

  public onBeforeMessage(actor: Actor, message: ActorMessage): void {
    //
  }

  public onAfterMessage(actor: Actor, message: ActorMessage): void {
    //
    const localActor: any = actor
    this.root.render(localActor.render(localActor.__internals.react.reduce((acc,value) => {
        acc[value.name]=value.prop
        return acc
    },{})))
  }

  public onError(actor: Actor, message: ActorMessage, error: any): void {
    //
  }
}
