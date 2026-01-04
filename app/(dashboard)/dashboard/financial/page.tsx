import { getFinancialSummary } from "@/actions/financial";
import { NewTransactionDialog } from "@/components/dashboard/financial/new-transaction-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";

// Função para formatar moeda
const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default async function FinancialPage() {
  const { transactions, metrics } = await getFinancialSummary();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestão Financeira</h1>
        <NewTransactionDialog />
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas (Mês)</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(metrics.income)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas (Mês)</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(metrics.expense)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatCurrency(metrics.balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Nenhuma movimentação registrada este mês.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.description}</TableCell>
                    <TableCell>{t.category}</TableCell>
                    <TableCell>{new Date(t.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                        <Badge variant={t.status === 'PAID' ? 'default' : 'secondary'}>
                            {t.status === 'PAID' ? 'Pago' : 'Pendente'}
                        </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'EXPENSE' ? '- ' : '+ '}
                      {formatCurrency(Number(t.amount))}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}