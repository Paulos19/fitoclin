import { formatInTimeZone, toZonedTime, fromZonedTime } from "date-fns-tz";

const SAO_PAULO_TZ = "America/Sao_Paulo";

/** Converte uma Date (interpretada como horário de SP) para UTC para armazenamento no banco */
export function saoPauloToUtc(date: Date): Date {
  return fromZonedTime(date, SAO_PAULO_TZ);
}

/** Converte uma Date UTC do banco para uma Date no timezone de SP */
export function utcToSaoPaulo(date: Date): Date {
  return toZonedTime(date, SAO_PAULO_TZ);
}

/** Formata uma Date UTC para exibição no timezone de SP */
export function formatInSaoPaulo(date: Date, formatStr: string): string {
  return formatInTimeZone(date, SAO_PAULO_TZ, formatStr);
}

/** Retorna "agora" no timezone de São Paulo como uma Date comparável */
export function nowInSaoPaulo(): Date {
  const nowStr = formatInTimeZone(new Date(), SAO_PAULO_TZ, "yyyy-MM-dd'T'HH:mm:ss");
  return new Date(nowStr + "Z");
}
