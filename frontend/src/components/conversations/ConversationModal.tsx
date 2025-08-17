import { X, Bot, User, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Conversation } from '@/types/lead';

interface ConversationModalProps {
  conversation: Conversation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ConversationModal({ conversation, isOpen, onClose }: ConversationModalProps) {
  if (!conversation) return null;

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentColor = (role: 'agent' | 'user') => {
    // This would ideally come from sentiment analysis per message
    // For demo purposes, showing neutral colors
    return role === 'agent' ? 'bg-primary/10 text-primary' : 'bg-muted';
  };

  const totalMessages = conversation.sentiment.positive + conversation.sentiment.neutral + conversation.sentiment.negative;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Conversation Details</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <Badge variant="secondary">
              Lead ID: {conversation.lead_id}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {new Date(conversation.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Sentiment:</span>
              <Badge className="ml-2 bg-sentiment-positive/20 text-sentiment-positive">
                Positive: {conversation.sentiment.positive}
              </Badge>
              <Badge className="ml-1 bg-sentiment-neutral/20 text-sentiment-neutral">
                Neutral: {conversation.sentiment.neutral}
              </Badge>
              <Badge className="ml-1 bg-sentiment-negative/20 text-sentiment-negative">
                Negative: {conversation.sentiment.negative}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-96 mt-4">
          <div className="space-y-4 pr-4">
            {conversation.messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'agent' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`flex gap-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {message.role === 'agent' ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg p-3 ${getSentimentColor(message.role)} ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : ''
                  }`}>
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {conversation.drop_off_point && (
          <div className="mt-4 p-3 bg-warning-light rounded-lg">
            <div className="text-sm">
              <span className="font-medium text-warning">Drop-off Point:</span>
              <span className="ml-2">{conversation.drop_off_point}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}