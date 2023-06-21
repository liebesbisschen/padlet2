export class ErrorMessage {

  constructor (
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}

}


export const PadletFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Ein Titel für dein Padlet angegeben werden'),
  new ErrorMessage('title', 'required', 'Es muss ein Eintragstitel angegeben werden'),
  new ErrorMessage('content', 'min', 'Ein Inhalt des Eintrags muss angegeben werden'),

];
