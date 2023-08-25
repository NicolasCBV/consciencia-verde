import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class RefreshUseCase {
  constructor(
	private readonly refreshGate: UserGateways.RefreshUserTokenGateway
  ) {}

  async exec() {
	return this.refreshGate.refresh();
  }
}
