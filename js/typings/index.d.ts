
// js runtime types

interface DenoCore {
    opAsync: (op: "op_plugin_get_pending_event") => Promise<PluginEvent>
    ops: InternalApi
}

type PluginEvent = ViewEvent | RunCommand | OpenView | PluginCommand | OpenInlineView
type RenderLocation = "InlineView" | "View"

type ViewEvent = {
    type: "ViewEvent"
    widgetId: number
    eventName: string
    eventArguments: PropertyValue[]
}

type OpenView = {
    type: "OpenView"
    frontend: string
    entrypointId: string
}

type RunCommand = {
    type: "RunCommand"
    entrypointId: string
}

type PluginCommand = {
    type: "PluginCommand"
    commandType: "stop"
}

type OpenInlineView = {
    type: "OpenInlineView"
    text: string
}

type PropertyValue = PropertyValueString | PropertyValueNumber | PropertyValueBool | PropertyValueUndefined
type PropertyValueString = { type: "String", value: string }
type PropertyValueNumber = { type: "Number", value: number }
type PropertyValueBool = { type: "Bool", value: boolean }
type PropertyValueUndefined = { type: "Undefined" }

type UiWidget = {
    widgetId: number,
    widgetType: string,
    widgetProperties: Props,
    widgetChildren: UiWidget[],
}

type Props = { [key: string]: any };
type PropsWithChildren = { children?: UiWidget[] } & Props;

interface InternalApi {
    op_log_trace(target: string, message: string): void;
    op_log_debug(target: string, message: string): void;
    op_log_info(target: string, message: string): void;
    op_log_warn(target: string, message: string): void;
    op_log_error(target: string, message: string): void;

    op_component_model(): Record<string, Component>;

    op_inline_view_endpoint_id(): string | null;
    clear_inline_view(): void;

    op_react_replace_view(render_location: RenderLocation, top_level_view: boolean, container: UiWidget): void;
}

// component model types

type Component = StandardComponent | RootComponent | TextPartComponent

type StandardComponent = {
    type: "standard",
    internalName: string,
    name: string,
    props: Property[],
    children: Children,
}

type RootComponent = {
    type: "root",
    internalName: string,
    children: ComponentRef[],
}

type TextPartComponent = {
    type: "text_part",
    internalName: string,
}

type Property = {
    name: string
    optional: boolean
    type: PropertyType
}
type Children = ChildrenMembers | ChildrenString | ChildrenNone | ChildrenStringOrMembers

type ChildrenMembers = {
    type: "members",
    members: Record<string, ComponentRef>
}
type ChildrenStringOrMembers = {
    type: "string_or_members",
    textPartInternalName: string,
    members: Record<string, ComponentRef>
}
type ChildrenString = {
    type: "string"
    textPartInternalName: string,
}
type ChildrenNone = {
    type: "none"
}

type ComponentRef = {
    componentInternalName: string,
    componentName: string,
}

type PropertyType = TypeString | TypeNumber | TypeBoolean | TypeArray | TypeComponent | TypeFunction

type TypeString = {
    type: "string"
}
type TypeNumber = {
    type: "number"
}
type TypeBoolean = {
    type: "boolean"
}
type TypeArray = {
    type: "array"
    nested: PropertyType
}
type TypeComponent = {
    type: "component"
    reference: ComponentRef,
}
type TypeFunction = {
    type: "function"
    arguments: Property[]
}