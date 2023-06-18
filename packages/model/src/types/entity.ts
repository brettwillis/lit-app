import type { Grid, GridItemModel } from '@vaadin/grid'
import { CSSResult, LitElement, TemplateResult } from 'lit'
import type { Action, ButtonConfig } from './action'
import { EntityCreateDetail } from '../events'
import { GetAccess } from './getAccess'
import { Model } from './modelComponent'

// storing the state of an entity
export type EntityStatus = {
	isDirty: boolean,
	isEditing: boolean,
	isSaving: boolean,
	isLoading: boolean, // true when the entity is loading data
	isDeleting: boolean,
}

// storing the access information for an entity
export type EntityAccess = {
	isOwner: boolean,
	canEdit: boolean,
	canView: boolean,
	canDelete: boolean,
}

export interface FieldConfig {
	disabled?: boolean
	label?: string
	class?: string
}

export interface FieldConfigUpload extends FieldConfig {
	store?: string
	path?: string
	maxFiles?: number
	accept?: string
	maxFileSize?: number
}

interface EntityBase<T = any> extends LitElement {
	entity: EntityI
	data?: T
	icon?: string
	heading?: string
	appID?: string
}
export interface DefaultI {

}

export interface EntityElement<T = any> extends EntityBase<T> {
	id: string // not sure this is needed
	docId?: string // not sure this is needed
	entityStatus: EntityStatus
	entityAccess: EntityAccess
}

// interface for list
export interface EntityElementList<T = any> extends EntityBase<T> {
	entityStatus?: EntityStatus
	entityAccess?: EntityAccess
	size?: number
	selectedItems?: T[]
	showGridSelectColumn?: boolean
}

export type ColumnsConfig = {
	showSelectionColumn?: boolean
	template?: TemplateResult
	options?: {
		[key: string]: boolean | string
	}
}


export type RenderConfig = {
	entityAccess: EntityAccess,
	entityStatus: EntityStatus,
	level?: number, // level to render the entity
	options?: {
		[key: string]: boolean
	}
}
/**
 * Interface for render utility functions
 * to be applied for an entity
 */
export abstract class EntityRenderer<T > {
	
	
	/**
	 * Render a form for an entity
	 * @param data - the data for the form
	 * @param config - the configuration for the form
	 */
	abstract renderForm(data: T, config?: RenderConfig): TemplateResult | undefined

	/**
	 * Utility render functions for a group of entity actions to render as buttons
	 * @param entityAccess 
	 * @param entityStatus 
	 * @param data 
	 * @returns 
	 */
	abstract renderActions(data: any, config?: RenderConfig): TemplateResult | undefined

	/**
		* Utility render functions for a single entity actions to render as button and trigger an Action event
		* @param actionName the name of the action to render
		* @param config button config to apply to the button 
		* @param beforeDispatch a function called before the action is dispatched - dispatch will not happen if this function returns false 
		* @param onResolved a function called when the action event.detail.promise is resolved
		* @returns 
		*/
	abstract renderAction(actionName: keyof EntityI['actions'], data?: any, config?: ButtonConfig, beforeDispatch?: () => boolean | string | void, onResolved?: (promise: any) => void): TemplateResult | undefined
	
	abstract renderBulkActions(selectedItems: any[], data: any[], entityAccess?: EntityAccess, entityStatus?: EntityStatus): TemplateResult | undefined
	abstract renderBulkAction(selectedItems: any[], data: any[], action: Action, actionName: keyof EntityI['actions']): TemplateResult | undefined

	/**
	 * Render title for an entity
	 * @param data
	 * @param config
	 * @returns TemplateResult
	 */
	abstract renderTitle(data: T, config: RenderConfig): TemplateResult

	/**
	 * Render content of an entity
	 * @param data
	 * @param config
	 * @returns TemplateResult
	 */
	abstract renderContent(data: T, config: RenderConfig): TemplateResult

	/**
	 * Render a grid of entities
	 * 
	 * @param data - the data for the grid
	 * @param withOrganisation - true to display organisation column
	 */
	abstract renderGrid(data: T[], config: ColumnsConfig): TemplateResult

	/**
	 * render a table derived from the model
	 * @param data 
	 */
	abstract renderTable(data: T): TemplateResult

	/**
	 * Render columns for the grid
	 * 
	 * @param config - columns configuration - ColumnConfig
	 */
	abstract renderGridColumns(config: ColumnsConfig): TemplateResult

	/**
	 * The renderer for gridRowDetailsRenderer 
	 * 
	 * @param data - the data for the grid
	 * @param withOrganisation - true to display organisation column
	 */
	abstract gridDetailRenderer(item: T, model?: GridItemModel<T>, grid?: Grid): TemplateResult
	abstract renderMetaData(_data: T, _config?: RenderConfig): TemplateResult
	abstract renderBody(_data: T, _config?: RenderConfig): TemplateResult
	abstract renderArrayContent(_data: T[], _config?: RenderConfig): TemplateResult
	abstract renderHeader(_data: T, _config?: RenderConfig): TemplateResult
	abstract renderFooter(_data: T, _config?: RenderConfig): TemplateResult

}

export abstract class EntityI<Interface extends DefaultI = DefaultI> extends EntityRenderer<Interface> {
	// abstract constructor( host: EntityElement | EntityElementList, realTime: boolean, listenOnAction: boolean): void
	
	static getAccess: GetAccess
	static actions: any
	static model: Model<DefaultI>
	static locale?: Strings
	static entityName: string
	
	static styles: CSSResult | undefined

	constructor(_host: EntityElement | EntityElementList, _realTime: boolean, _listenOnAction: boolean) {
			super()
	}

	icon!: string
	_selected!: number
	host!: EntityElement | EntityElementList
	realtime?: boolean
	listenOnAction?: boolean
	showMetaData!: boolean
	showActions!: boolean
	entityName!: string
	actions!: unknown
	abstract renderField(name: string, config?: FieldConfig | FieldConfigUpload, data?: Interface): TemplateResult | undefined
	abstract renderFieldUpdate(name: string, config?: FieldConfig | FieldConfigUpload, data?: Interface): TemplateResult | undefined
	// onError(error: Error): void
	abstract create(details: EntityCreateDetail): void
	abstract open(entityName: string, id?: string): void
	abstract dispatchAction(actionName: keyof EntityI['actions']): CustomEvent
	
	static getEvent<K extends {actions: Record<string, Action>}>(
		actionName: keyof K['actions'], 
		data: any, 
		host: HTMLElement, 
		bulkAction?: boolean,
	){}
	static onActionClick<K extends {actions: Record<string, Action>}>(
		actionName: keyof K['actions'], 
		host: HTMLElement, 
		data?: any, 
		beforeDispatch?: () => boolean | string | void, 
		onResolved?: (promise: any) => void, 
		getEvent?: () => CustomEvent, 
		) {}
	static renderAction<K extends {actions: Record<string, Action>}>(
		actionName: keyof K['actions'], 
		element: HTMLElement, 
		data: any = {}, 
		config?: ButtonConfig, 
		beforeDispatch?: () => boolean | string | void, 
		onResolved?: (promise: any) => void) {}
}
