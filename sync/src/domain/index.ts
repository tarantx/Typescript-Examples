import { decorate } from "../utils/decorate"
import { AppActor } from "./AppActor"
import { ReactDecorator } from "./decorators/ReactDecorator"
import { Serialization } from "./decorators/Serialization"

const DecoratedActor = decorate(AppActor, Serialization, ReactDecorator)

export default DecoratedActor