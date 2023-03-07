import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }
  async sendMail(to: string, subject: string, variables, path): Promise<void> {
    const templateFileContente = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContente);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentalx <noreplay@rentalx.com.br>', // adicionar email validado pela aws
      subject,
      html: templateHTML,
    });
  }
}
