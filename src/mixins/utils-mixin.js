import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinUtils = function(superClass) {
	return class extends superClass {
		ready(){
			super.ready();
			this.set("domReady",true);
			this.dispatchEvent(new CustomEvent('dom-ready', {detail: {ready: true}}));
		}
		
		constructor(){
			super();
			var context=this;
			this.set("domReady",false);  
			this.dispatchEvent(new CustomEvent('dom-ready', {detail: {ready: false}}));
		}
		
		static get properties(){
			return{
				configLenguaje:{type:Object, notify:true,value:{
					code: "es",
					toolbar: {
					  default: "Valor por defecto",
					  save: "Guardar",
					  font: "Fuente",
					  formats: "Formato",
					  fontSize: "Tamaño de fuente",
					  bold: "Negrita",
					  underline: "Subrayado",
					  italic: "Cursiva",
					  strike: "Tachado",
					  subscript: "Subíndice",
					  superscript: "Superíndice",
					  removeFormat: "Eliminar formato",
					  fontColor: "Color de fuente",
					  hiliteColor: "Color de resaltado",
					  indent: "Más tabulación",
					  outdent: "Menos tabulación",
					  align: "Alinear",
					  alignLeft: "Alinear a la izquierda",
					  alignRight: "Alinear a la derecha",
					  alignCenter: "Alinear al centro",
					  alignJustify: "Justificar",
					  list: "Lista",
					  orderList: "Lista ordenada",
					  unorderList: "Lista desordenada",
					  horizontalRule: "Horizontal line",
					  hr_solid: "Línea horizontal solida",
					  hr_dotted: "Línea horizontal punteada",
					  hr_dashed: "Línea horizontal discontinua",
					  table: "Tabla",
					  link: "Link",
					  math: "Matemáticas",
					  image: "Imagen",
					  video: "Video",
					  audio: "Audio",
					  fullScreen: "Pantalla completa",
					  showBlocks: "Ver bloques",
					  codeView: "Ver código fuente",
					  undo: "UndoDeshacer última acción",
					  redo: "Rehacer última acción",
					  preview: "Vista previa",
					  print: "Imprimir",
					  tag_p: "Párrafo",
					  tag_div: "Normal (DIV)",
					  tag_h: "Header",
					  tag_blockquote: "Cita",
					  tag_pre: "Código",
					  template: "Plantilla",
					  lineHeight: "Altura de la línea",
					  paragraphStyle: "Estilo del parrafo",
					  textStyle: "Estilo del texto",
					  imageGallery: "Galería de imágenes"
					},
					dialogBox: {
					  linkBox: {
						title: "Insertar Link",
						url: "¿Hacia que URL lleva el link?",
						text: "Texto para mostrar",
						newWindowCheck: "Abrir en una nueva ventana"
					  },
					  mathBox: {
						title: "Matemáticas",
						inputLabel: "Notación Matemática",
						fontSizeLabel: "Tamaño de fuente",
						previewLabel: "Vista previa"
					  },
					  imageBox: {
						title: "Insertar imagen",
						file: "Seleccionar desde los archivos",
						url: "URL de la imagen",
						altText: "Texto alternativo"
					  },
					  videoBox: {
						title: "Insertar Video",
						file: "Seleccionar desde los archivos",
						url: "¿URL del vídeo? Youtube/Vimeo"
					  },
					  audioBox: {
						title: "Insertar Audio",
						file: "Seleccionar desde los archivos",
						url: "URL de la audio"
					  },
					  browser: {
						tags: "Etiquetas",
						search: "Buscar"
					  },
					  caption: "Insertar descripción",
					  close: "Cerrar",
					  submitButton: "Enviar",
					  revertButton: "revertir",
					  proportion: "Restringir las proporciones",
					  basic: "Basico",
					  left: "Izquierda",
					  right: "derecha",
					  center: "Centro",
					  width: "Ancho",
					  height: "Alto",
					  size: "Tamaño",
					  ratio: "Proporción"
					},
					controller: {
					  edit: "Editar",
					  unlink: "Desvincular",
					  remove: "Quitar",
					  insertRowAbove: "Insertar fila arriba",
					  insertRowBelow: "Insertar fila debajo",
					  deleteRow: "Eliminar fila",
					  insertColumnBefore: "Insertar columna antes",
					  insertColumnAfter: "Insertar columna después",
					  deleteColumn: "Eliminar columna",
					  fixedColumnWidth: "Ancho de columna fijo",
					  resize100: "Redimensionar 100%",
					  resize75: "Redimensionar 75%",
					  resize50: "Redimensionar 50%",
					  resize25: "Redimensionar 25%",
					  autoSize: "Tamaño automático",
					  mirrorHorizontal: "Espejo, Horizontal",
					  mirrorVertical: "Espejo, Vertical",
					  rotateLeft: "Girar a la izquierda",
					  rotateRight: "Girar a la derecha",
					  maxSize: "Tamaño máximo",
					  minSize: "Tamaño minímo",
					  tableHeader: "Encabezado de tabla",
					  mergeCells: "Combinar celdas",
					  splitCells: "Dividir celdas",
					  HorizontalSplit: "División horizontal",
					  VerticalSplit: "División vertical"
					},
					menu: {
					  spaced: "Espaciado",
					  bordered: "Bordeado",
					  neon: "Neón",
					  translucent: "Translúcido",
					  shadow: "Sombreado",
					  code: "Código"
					}
				  }},

				listaGestores:{type:Array, notify:true,value:[
					{nombre:"ALEJANDRA JOCELYN LARIOS DOMINGUEZ",codigo:"JOCE"},
					{nombre:"ANA PATRICIA LEÓN RODRÍGUEZ",codigo:"PATY"},
					{nombre:"CRISTHIAN ALEXIS LUNA VEGA",codigo:"CRIS"},
					{nombre:"MARCO ANTONIO VÁZQUEZ RAMOS",codigo:"MARC"},
					{nombre:"ANABEL TRINIDAD FELICIANO",codigo:"ANAB"},
					{nombre:"ADRIANA CORREA MEJIA",codigo:"ADRI"},
					{nombre:"JORGE IVÁN MARTÌNEZ ROMERO",codigo:"JORG"},
					{nombre:"JOSÉ ANTONIO MORALES SÁNCHEZ",codigo:"ANTO"},
					{nombre:"OCTAVIO ULISES MALAGÓN SÁNCHEZ",codigo:"OCTA"},
					{nombre:"JESSICA JANET NAVA DOMINGUEZ",codigo:"NAVA"},
					{nombre:"KARLA JANETH CAMACHO HERNÁNDEZ",codigo:"KARL"},
					{nombre:"ESTEFANY ANDREA SERVIN OLVERA",codigo:"FANY"},
					{nombre:"BELEN HERNÁNDEZ TIMOTEO",codigo:"BELN"}

				]},
				
				estatus_lf:{type:Array, notify:true,value:[
					{nombre:"RECEPCIÓN DE INFORMACIÓN",significado:"EN PROCESO DE ASIGNACIÓN DE EVALUADOR POR ASEA"},
					{nombre:"EVALUACIÓN/ELABORACIÓN DE RESPUESTA",significado:"EN PROCESO DE EVALUACIÓN DE LA SOLICITUD Y ELABORACIÓN DE OFICIO DE RESPUESTA."},
					{nombre:"PENDIENTE DE FIRMA CON FIEL DE CLIENTE",significado:"PENDIENTE DE FIRMAR TRÁMITE CON FIEL DE CLIENTE PARA SU INGRESO"},
					{nombre:"RESOLUCIÓN POSITIVA",significado:"SE CUENTA CON UN RESOLUTIVO OTORGADO POR ASEA CON LA ASIGNACIÓN DE NÚMERO DE LF /LAU"},
					{nombre:"REQUERIMIENTO ADICIONAL",significado:"EN ELABORACIÓN DE REQUERIMIENTO DE INFORMACIÓN ADICIONAL, SOLICITADO POR ASEA"},
					{nombre:"CON FALTANTES DE INFORMACIÓN",significado:"EXISTE ALGUN DOCUMENTO O DATO FALTANTE PARA CONCLUIR CON LA INFORMACIÓN DE LA SOLICITUD DE TRÁMITE"},
					{nombre:"NEGACIÓN/ DESECHO DE TRÁMITE",significado:"NEGACIÓN O DESECHO DE TRÁMITE POR INCUMPLIMIENTO DE LOS REQUISITOS ESTABLECIDOS PARA LA LICENCIA DE FUNCIONAMIENTO"},
					{nombre:"SIN AUTORIZACIÓN DE PRE-REGISTRO (CURR)",significado:"NO SE CUENTA CON LA AUTORIZACIÓN DE PRE-REGISTRO POR ASEA PARA EL INGRESO DE LA SOLICITUD DEL TRÁMITE"},
				]},

				estatusSasi:{type:Array, notify:true, value:[
					{nombre:"RECEPCIÓN DE INFORMACIÓN",significado:"EN LISTA PARA SER EVALUADO"},
					{nombre:"EVALUACIÓN",significado:"EL SISTEMA ESTA SIENDO EVALUADO POR PERSONAL DE LA ASEA"},
					{nombre:"ELABORACIÓN DE RESPUESTA",significado:"YA SE ENCUENTRAN REDACTANDO EL OFICIO DE NOTIFICACION"},
					{nombre:"PREVENCIÓN",significado:"SE HICIERON OBSERVACIONES AL SA. NOTIFICACIÓN"},
					{nombre:"CONFORMACIÓN",significado:"CONSTANCIA DE CONFORMACION . NOTIFICACIÓN"},
					{nombre:"AUTORIZACIÓN",significado:"AUTORIZACION PARA IMPLEMENTACION . NOTIFICACIÓN"},
					{nombre:"EN ELABORACIÓN DEL GESTOR",significado:"-"},
					{nombre:"SISTEMAS DETENIDOS",significado:"-"},
					{nombre:"ACTUALIZACIÓN DE CONTRASEÑA",significado:"-"},
				]},
				
				_ventaPor:{type:Array, notify:true, value:[
					{codigo:"GK",nombre:"GRUPO KHALIA"},
					{codigo:"GSINT",nombre:"GAS INTEGRAL"},
					{codigo:"ASEGAS",nombre:"ASEGAS"},
					{codigo:"BESCO",nombre:"BESCO"},
					{codigo:"PTEC",nombre:"PETROTEC"},
					{codigo:"JC",nombre:"JAIME"},
				]},
				
				_estados:{type:Array, notify:true, value:[
					{nombre:"AGUASCALIENTES",codigo:"AGS"},
					{nombre:"BAJA CALIFORNIA NORTE",codigo:"BCN"},
					{nombre:"BAJA CALIFORNIA SUR",codigo:"BCS"},
					{nombre:"CAMPECHE",codigo:"CAMP"},
					{nombre:"COAHUILA",codigo:"COAH"},
					{nombre:"COLIMA",codigo:"COL"},
					{nombre:"CHIAPAS",codigo:"CHIS"},
					{nombre:"CHIHUAHUA",codigo:"CHIH"},
					{nombre:"DURANGO",codigo:"DGO"},
					{nombre:"ESTADO DE MÉXICO",codigo:"EDOMX"},
					{nombre:"GUANAJUATO",codigo:"GTO"},
					{nombre:"GUERRERO",codigo:"GRO"},
					{nombre:"HIDALGO",codigo:"HGO"},
					{nombre:"JALISCO",codigo:"JAL"},
					{nombre:"CIUDAD DE MÉXICO",codigo:"CDMX"},
					{nombre:"MICHOACAN",codigo:"MICH"},
					{nombre:"MORELOS",codigo:"MOR"},
					{nombre:"NAYARIT",codigo:"NAY"},
					{nombre:"NUEVO LEÓN",codigo:"N.L."},
					{nombre:"OAXACA",codigo:"OAX"},
					{nombre:"PUEBLA",codigo:"PUE"},
					{nombre:"QUERÉTARO",codigo:"QRO"},
					{nombre:"QUINTANA ROO",codigo:"Q.R."},
					{nombre:"SAN LUIS POTOSI",codigo:"SLP"},
					{nombre:"SINALOA",codigo:"SIN"},
					{nombre:"SONORA",codigo:"SON"},
					{nombre:"TABASCO",codigo:"TAB"},
					{nombre:"TAMAULIPAS",codigo:"TAMPS"},
					{nombre:"TLAXCALA",codigo:"TLAX"},
					{nombre:"VERACRUZ",codigo:"VER"},
					{nombre:"YUCATAN",codigo:"YUC"},
					{nombre:"ZACATECAS",codigo:"ZAC"}
				]},
				_abecedario:{
					type:Array,
					notify:true,
					value: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
				},
				materialColors:{
					type:Array,
					notify:true,
					value:[
						"red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green",
						"light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"
					]
				},
				monthNames:{
					type:Array,
					notify:true,
					value:[
						'Enero','Febrero','Marzo','Abril','Mayo','Junio',
						'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'
					]
				},

				// nombresSasi:{
				// 	type:Array, notify:true,
				// 	value:[
				// 		{key:"NA",nombre:"NO APLICA"},
				// 		{key:"POLITICA",nombre:"Política"},
				// 		{key:"PELIGROS",nombre:"Identificación de peligros y análisis de riesgos"},
				// 		{key:"LEGALES",nombre:"Requisitos legales"},
				// 		{key:"METAS",nombre:"Metas, objetivo e indicadores"},
				// 		{key:"FUNCIONES",nombre:"Funciones, responsabilidades y autoridad"},
				// 		{key:"COMPETENCIA",nombre:"Competencia, capacitación y entrenamiento"},
				// 		{key:"COMUNICACION",nombre:"Comunicación, participación y consulta"},
				// 		{key:"ONTROL_DOC",nombre:"Control de documentos"},
				// 		{key:"PRACTICAS",nombre:"Mejores prácticas y estándares"},
				// 		{key:"CONTROL_PROC",nombre:"Control de actividades y procesos"},
				// 		{key:"INTEGRIDAD",nombre:"Integridad mecánica y aseguramiento de la calidad"},
				// 		{key:"SEGURIDAD",nombre:"Seguridad de contratistas"},
				// 		{key:"EMERGENCIAS",nombre:"Preparación y respuesta a emergencias"},
				// 		{key:"MONITOREO",nombre:"Monitoreo, verificación y evaluación"},
				// 		{key:"AUDITORIAS",nombre:"Auditorías"},
				// 		{key:"INVESTIGACION",nombre:"Investigación de incidentes y accidentes"},
				// 		{key:"REVISION",nombre:"Revisión de resultados"},
				// 		{key:"INFORME",nombre:"Informes de desempeño"}
				// 	]
				// },

				// nombresNom005:{
				// 	type:Array, notify:true,
				// 	value:[
				// 		{key:"CONTROL-PRODUCTOS",nombre:"Recepción, descarga de producto y desviaciones de balance"},
				// 		{key:"LIMPIEZAS",nombre:"Limpiezas programadas y no programadas"},
				// 		{key:"INCIDENTES",nombre:"Incidentes, accidentes e inspecciones"}
						
				// 	]
				// },

				// nombresGeneral:{
				// 	type:Array, notify:true,
				// 	value:[
				// 		{key:"CRE",nombre:"CRE"},
				// 		{key:"PROFECO",nombre:"PROFECO"},
				// 		{key:"PROTECCION-CIVIL",nombre:"Protección Civil"},
				// 		{key:"OTRO",nombre:"Otro (especifique)"},
				// 	]
				// },
				
				vaadinDateConfig:{
					type:Object,
					notify:true,
					value:{
						monthNames:[
							'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre',
							'Octubre', 'Noviembre', 'Diciembre'
						],
						weekdays: [
							'Domingo', 'Lunes', 'Martes', 'Miércoles','Jueves', 'Viernes', 'Sábado'
						],
						weekdaysShort: [
							'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'
						],
						firstDayOfWeek: 0,
						week: 'Semana',
						calendar: 'Calendario',
						clear: 'Limpiar',
						today: 'Hoy',
						cancel: 'Cancelar',
						formatDate: d => {
							var monthNames=[
								'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre',
								'Octubre', 'Noviembre', 'Diciembre'
							];
							return d.day+"/"+(monthNames[d.month])+"/"+d.year;
						},
						parseDate: text => {
							var split=text.split("/");
							var mes=split[1];
							var numero=-1;
							var monthNames=[
								'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre',
								'Octubre', 'Noviembre', 'Diciembre'
							];
							for(var i=0;i<monthNames.length;i++){
								var m=monthNames[i];
								if(mes==m){
									numero=i;
									break;
								}
							}
							var datos={day:Number(split[0]),month:numero,year:Number(split[2])};
							return datos;
						},
						formatTitle: (monthName, fullYear) => {
							return monthName + ' ' + fullYear;
						}
					}
				},

				vaadinTimeConfig:{
					type:Object,
					notify:true,
					value:{
						formatTime: function(timeObject) {
							if (timeObject) {
								const pad = function(n) {
									n = parseInt(n || 0);
									return n < 10 ? '0' + n : n;
								};
								const period = timeObject.hours > 11 ? 'PM' : 'AM';
								const hours = timeObject.hours % 12 || 12;
								return pad(hours) + ':' + pad(timeObject.minutes) + ' ' + period;
							}
						},
						parseTime: function(timeString) {
							if (timeString) {
								const parts = /^(\d{1,2})(?::(\d{1,2}))?(?:\s(\w{2}))?$/.exec(timeString);
								let hours;
								if (parts) {
									if (parts[1] === '12') {
										if (parts[3] === 'PM') {
											// for 12pm noon, set hours to 12
											hours = 12;
										} else if (parts[3] === 'AM') {
											// for 12am midnight, set hours to 0
											hours = 0;
										}
									} else {
										// Add 12 hours if the time is after noon.
										hours = parseInt(parts[1]) + (parts[3] === 'PM' ? 12 : 0);
									}
								}
								return parts && {
									hours: hours,
									minutes: parts[2]
								};
							}
						}
					}
				}
			};
		}
		
		_getRandomColor(){
			var random=Math.floor(Math.random()*this.materialColors.length);
			return (this.materialColors[random]);
		}
		
		_getMonthThreeLetters(timestamp){
			var date=this.PolymerUtils_getDateFromTimestamp(timestamp);
			return this.monthNames[date.getMonth()].toUpperCase().substring(0,3);
		}
		
		_getDateOfMonth(timestamp){
			var date=this.PolymerUtils_getDateFromTimestamp(timestamp);
			return date.getDate();
		}
		
		_convertirHoras(minutos){
			if(minutos>=60){
				var mod=minutos%60;
				var horas=Math.floor(minutos/60);
				return horas+" h "+mod+" m";
			}else{
				return minutos + " m";
			}
		}
		
		_formatPercentageEntero(val,sinSigno){
			if(typeof val!="number"){
				val=Number(val);
			}
			if(isNaN(val)){
				val=0;
			}
			var signo="%";
			if(sinSigno=="true"){
				signo="";
			}
			if(val)
			return Number(val.formatCurrency()).toFixed(0)+"%";
			else return "0%";
		}
		
		_formatPercentage(val,sinSigno){
			if(typeof val!="number"){
				val=Number(val);
			}
			if(isNaN(val)){
				val=0;
			}
			var signo="%";
			if(sinSigno=="true"){
				signo="";
			}
			if(val)
			return val.formatCurrency()+"%";
			else return "0.00%";
		}
		
		_formatCurrency(val,sinSigno){
			if(typeof val!="number"){
				val=Number(val);
			}
			if(isNaN(val)){
				val=0;
			}
			var signo=SetupData.currencySign;
			if(sinSigno=="true"){
				signo="";
			}
			if(val)
			return signo+val.formatCurrency();
			else return signo+"0.00";
		}

		validateEmail(mail){
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
			   return (true);
			}
			return (false);
		}
		
		_toUpperCase(string){
			if(string){
				return string.toUpperCase();
			}
			return null;
		}
		
		_toLowerCase(string){
			if(string){
				return string.toLowerCase();
			}
			return null;
		}
		
		_getCSSPropertyValue(css,el){
			if(!el){
				el=this;
			}
			var style=null;
			if (ShadyCSS) {
				style = ShadyCSS.getComputedStyleValue(el, css);
			} else {
				style = getComputedStyle(el).getPropertyValue(css);
			}
			return style;
		}
		
		PolymerUtils_getDateFromTimestamp(t){
			return PolymerUtils.getDateFromTimestamp(t);
		}

		PolymerUtils_getTimeString(t){
			return PolymerUtils.getTimeString(t);
		}
		
		PolymerUtils_getFullSpanishDate(t){
			return PolymerUtils.getFullSpanishDate(t);
		}
		
		PolymerUtils_getTimeStringFromString(t){
			var fecha=new Date(t);
			return PolymerUtils.getTimeString(fecha.getTime()+86400000);
		}
		
		PolymerUtils_getDateStringFromString(t){
			var fecha=new Date(t);
			return PolymerUtils.getDateString(fecha.getTime()+86400000);
		}
		
		PolymerUtils_getSpanishDateString(t){
			if(!t){
				return "-";
			}
			var fecha=PolymerUtils.getDateObjectFromString(t);
			return PolymerUtils.getDateString(fecha.getTime());
		}

		PolymerUtils_getDateString(t,yesterday){
			return PolymerUtils.getDateString(t,yesterday);
		}
		PolymerUtils_getHourString(t){
			return PolymerUtils.getHourString(t);
		}

		/**
		 * 
		 * @param {*} array arreglo a buscar
		 * @param {*} key string llave de objeto
		 * @param {*} value valor a buscar
		 */
		buscaObjectoArreglo(array, key, value) {
			for (var i = 0; i < array.length; i++) {
				if (array[i][key] === value) {
					return array[i];
				}
			}
			return null;
		}

		muestraNombreActividad(obj){
			var seccion=obj.seccion;
			switch (seccion) {
				case "SASISOPA":
					var elem=this.buscaObjectoArreglo(this.nombresSasi,"key",obj.elemento);
				return elem.nombre;
				case "NOM005":
					var elem=this.buscaObjectoArreglo(this.nombresNom005,"key",obj.nombreBitacora);
				return elem.nombre;
				case "GENERAL":
				return obj.institucion + "-" + obj.nombreActividad;
			}
		}

		muestraNombreCorto(obj){
			var seccion=obj.seccion;
			switch (seccion) {
				case "SASISOPA":
				return obj.elemento;
				case "NOM005":
				return obj.nombreBitacora;
				case "GENERAL":
				return obj.institucion + "-" + obj.nombreActividad;
			}
		}
		
	}
}
export const UtilsMixin = dedupingMixin(internalMixinUtils);
		
	   