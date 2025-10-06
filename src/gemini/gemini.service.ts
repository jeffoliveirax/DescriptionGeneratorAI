import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não está configurada');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async enhanceProductDescription(
    name: string,
    description: string,
    price: number,
  ): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `
        Crie uma descrição aprimorada e focada em marketing para o seguinte produto:

        Nome do Produto: ${name}
        Descrição Original: ${description}
        Preço: R$${price}

        Por favor, crie uma descrição de produto persuasiva que:
        - Destaque os principais recursos e benefícios
        - Utilize linguagem de marketing persuasiva
        - Mantenha a precisão em relação à descrição original
        - Seja adequada para e-commerce
        - Tenha aproximadamente 2-3 frases

        Retorne apenas a descrição aprimorada, sem textos ou formatações adicionais.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      this.logger.log(`Descrição aprimorada gerada para o produto: ${name}`);
      return text.trim();
    } catch (error) {
      this.logger.error(
        `Falha ao aprimorar descrição para o produto: ${name}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new Error('Falha ao gerar descrição aprimorada');
    }
  }
}

