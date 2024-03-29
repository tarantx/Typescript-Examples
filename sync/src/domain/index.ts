import { decorate } from "tarant-utils"
import { AppActor } from "./AppActor"
import { ReactDecorator } from "./decorators/ReactDecorator"
import { Serialization } from "./decorators/Serialization"

const DecoratedActor = decorate(AppActor, Serialization, ReactDecorator)

export default DecoratedActor