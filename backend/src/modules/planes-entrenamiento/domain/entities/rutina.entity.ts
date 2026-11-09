import { ItemRutina } from './item-rutina.entity';
import { NumeroRutina } from '../value-objects/numero-rutina.vo';
import { ComposicionRutinaPolicy } from '../policies/composicion-rutina.policy';
import { ValidacionDeNegocioException } from '../../../../shared/domain/exceptions/validacion-de-negocio.exception';

export interface RutinaProps {
  id: string;
  numero: NumeroRutina;
  items: ItemRutina[];
}

export class Rutina {
  private constructor(private readonly props: RutinaProps) {}

  /**
   * Crea una rutina nueva validando la composición mínima.
   * El `id` lo provee la factory (generado con el GeneradorIdPort).
   */
  static crear(params: {
    id: string;
    numero: NumeroRutina;
    items: ItemRutina[];
  }): Rutina {
    if (!params.id || params.id.trim().length === 0) {
      throw new ValidacionDeNegocioException('El id de la rutina es obligatorio.');
    }
    ComposicionRutinaPolicy.validar(
      params.items.map((i) => ({ tipo: i.getTipo() })),
    );
    return new Rutina({
      id: params.id,
      numero: params.numero,
      items: [...params.items],
    });
  }

  static reconstituir(props: RutinaProps): Rutina {
    return new Rutina({ ...props, items: [...props.items] });
  }

  getId(): string { return this.props.id; }
  getNumero(): number { return this.props.numero.getValor(); }
  getItems(): ReadonlyArray<ItemRutina> { return this.props.items; }

  agregarItem(item: ItemRutina): void {
    const nuevos = [...this.props.items, item];
    ComposicionRutinaPolicy.validar(nuevos.map((i) => ({ tipo: i.getTipo() })));
    this.props.items = nuevos;
  }
}